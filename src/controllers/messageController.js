/* eslint-disable no-underscore-dangle */
const User = require("../db/models/userModel")
const Message = require("../db/models/messageModel")
const Chat = require("../db/models/messageModel")
const asyncHandler = require("../middleware/asyncHandler")

// @desc Get all Messages
// @route GET /api/Message/:chatId
// @access Protected
const allMessages = asyncHandler(async (req, res) => {
	try {
		const messages = await Message.find({ chat: req.params.chatId })
			.populate("sender", "name pic email")
			.populate("chat")
		res.json(messages)
	} catch (error) {
		res.status(400)
		throw new Error(error.message)
	}
})

// @desc	Create New Message
// @route 	POST /api/Message/
// @access 	Protected
const sendMessage = asyncHandler(async (req, res) => {
	const { content, chatId } = req.body

	if (!content || !chatId) {
		res.sendStatus(400)
		throw new Error("Invalid data passed into request")
	}

	let newMessage = {
		sender: req.user._id,
		content,
		chat: chatId,
	}

	try {
		let message = await Message.create(newMessage)

		message = await message.populate("sender", "name pic").execPopulate()
		message = await message.populate("chat").execPopulate()
		message = await User.populate(message, {
			path: "chat.users",
			select: "name pic email",
		})

		await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message })

		res.json(message)
	} catch (error) {
		res.status(400)
		throw new Error(error.message)
	}
})

module.exports = { allMessages, sendMessage }
