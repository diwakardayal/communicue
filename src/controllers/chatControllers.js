/* eslint-disable no-underscore-dangle */
const asyncHandler = require("../middleware/asyncHandler")
const Chat = require("../db/models/chatModel")
const User = require("../db/models/userModel")

// @desc    Fetch 1 on 1 chat if not exist create
// @route   POST /api/chat/
// @access  Protected
const accessChat = asyncHandler(async (req, res) => {
	const { userId } = req.body

	if (!userId) {
		res.sendStatus(400)
		throw new Error("UserId not sent with request")
	}

	let chat = await Chat.find({
		isGroupChat: false,
		$and: [
			{ users: { $elemMatch: { $eq: req.user._id } } },
			{ users: { $elemMatch: { $eq: userId } } },
		],
	})
		.populate("users", "-password")
		.populate("latestMessage")

	chat = await User.populate(chat, {
		path: "latestMessage.sender",
		select: "name picture email",
	})

	if (chat.length > 0) {
		res.send(chat[0])
	} else {
		let chatData = {
			chatName: "sender",
			isGroupChat: false,
			users: [req.user._id, userId],
		}

		try {
			const createdChat = await Chat.create(chatData)
			const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
				"users",
				"-password"
			)
			res.status(200).json(fullChat)
		} catch (error) {
			res.status(400)
			throw new Error(error.message)
		}
	}
})

// @desc    Fetch all chats for a user
// @route   GET /api/chat/
// @access  Protected
const fetchUserChats = asyncHandler(async (req, res) => {
	try {
		const userChat = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
			.populate("users", "-password")
			.populate("groupAdmin", "-password")
			.populate("latestMessage")
			.sort({ updatedAt: -1 })

		let populatedChats = await User.populate(userChat, {
			path: "latestMessage.sender",
			select: "name picture email",
		})

		res.status(200).send(populatedChats)
	} catch (error) {
		res.status(400)
		throw new Error(error.message)
	}
})

// @desc  Create New Group Chat
// @route        POST /api/chat/group
// @access       Protected
const createGroupChat = asyncHandler(async (req, res) => {
	const { users, name } = req.body

	if (!users || !name) {
		res.status(400)
		throw new Error("Please fill all the fields")
	}

	if (users.length < 2) {
		res.status(400)
		throw new Error("More than 2 users are required to form a group chat")
	}

	users.push(req.user)

	try {
		const groupChat = await Chat.create({
			chatName: req.body.name,
			users,
			isGroupChat: true,
			groupAdmin: req.user,
		})

		const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
			.populate("users", "-password")
			.populate("groupAdmin", "-password")

		res.status(200).json(fullGroupChat)
	} catch (error) {
		res.status(400)
		throw new Error(error.message)
	}
})

// @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected
const renameGroup = asyncHandler(async (req, res) => {
	const { chatId, chatName } = req.body

	const updatedChat = await Chat.findByIdAndUpdate(
		chatId,
		{
			chatName,
		},
		{
			new: true,
		}
	)
		.populate("users", "-password")
		.populate("groupAdmin", "-password")

	if (!updatedChat) {
		res.status(404)
		throw new Error("Chat Not Found")
	} else {
		res.json(updatedChat)
	}
})

// @desc    Remove user from Group
// @route   PUT /api/chat/groupremove
// @access  Protected
const removeFromGroup = asyncHandler(async (req, res) => {
	const { chatId, userId } = req.body

	// check if the requester is admi
	const removed = await Chat.findByIdAndUpdate(
		chatId,
		{
			$pull: { users: userId },
		},
		{
			new: true,
		}
	)
		.populate("users", "-password")
		.populate("groupAdmin", "-password")

	if (!removed) {
		res.status(404)
		throw new Error("Chat Not Found")
	} else {
		res.json(removed)
	}
})

// @desc    Add user to Group / Leave
// @route   PUT /api/chat/groupadd
// @access  Protected
const addToGroup = asyncHandler(async (req, res) => {
	const { chatId, userId } = req.body

	// check if the requester is admin

	const added = await Chat.findByIdAndUpdate(
		chatId,
		{
			$push: { users: userId },
		},
		{
			new: true,
		}
	)
		.populate("users", "-password")
		.populate("groupAdmin", "-password")

	if (!added) {
		res.status(404)
		throw new Error("Chat Not Found")
	} else {
		res.status(200).json(added)
	}
})

module.exports = {
	accessChat,
	fetchUserChats,
	createGroupChat,
	renameGroup,
	addToGroup,
	removeFromGroup,
}
