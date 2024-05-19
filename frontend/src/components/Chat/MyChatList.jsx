/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react"
import { FaPlus } from "react-icons/fa6"
import Modal from "../Modal"
import InputField from "../InputField"
import { toast } from "react-toastify"
import { useChat } from "../../hooks"
import { searchUser } from "../../services/user"
import { debounce } from "../../utils"
import { RxCross2 } from "react-icons/rx"
import { ToastConfig } from "../../utils/component"
import { createChatRoom } from "../../services/chat"

let chatLists = [
	{
		latestMessage: "Hello its me",
		user: "Guest User",
		chatName: "lol2",
	},
	{
		latestMessage: "YOYO ",
		user: "diwakar@gmail.com",
	},
	{
		latestMessage: "What's up?",
		user: "john.doe@example.com",
	},
]
// For Testing Only
chatLists = chatLists.map(b => ({ ...b, chatName: "Nice" }))

export default function MyChatList() {
	const [isCreateGroupChatVisible, setIsCreateGroupChatVisible] = useState(false)

	const { setCurrentChat } = useChat()

	return (
		<>
			<div className="bg-white w-2/5 rounded-md md:block hidden p-5">
				<div className="flex justify-between">
					<h2 className="text-3xl">My Chats</h2>
					<NewGroupChatButton onClick={() => setIsCreateGroupChatVisible(true)} />
				</div>
				<div className="mt-4 h-[calc(100vh-200px)] overflow-y-auto px-2">
					{chatLists.map((chat, index) => (
						<div
							key={index}
							className="p-4 border-b border-gray-200 bg-gray-200 mb-2 rounded-md cursor-pointer flex flex-col"
							onClick={() => setCurrentChat("LOL")}
						>
							<p>{chat?.chatName}</p>
							<div className="flex flex-wrap">
								<h3 className="font-semibold">{chat?.user} :&nbsp;</h3>
								<h3> {chat?.latestMessage}</h3>
							</div>
						</div>
					))}
				</div>
			</div>

			<Modal
				isModalVisible={isCreateGroupChatVisible}
				closeModal={() => setIsCreateGroupChatVisible(false)}
			>
				<NewGroupChatForm />
			</Modal>
			<ToastConfig />
		</>
	)
}

function NewGroupChatButton({ onClick }) {
	return (
		<button
			className="flex items-center gap-2 text-lg bg-gray-200  hover:bg-gray-300 rounded-md px-3 py-2 transition-all interactive-onFocus"
			onClick={onClick}
		>
			<span className="font-normal">New Group Chat</span>
			<FaPlus />
		</button>
	)
}

function NewGroupChatForm() {
	const [chatRoomName, setChatRoomName] = useState("")
	const [users, setUsers] = useState([])
	const [searchKeyword, setSearchKeyword] = useState(null)
	const [selectedUsers, setSelectedUsers] = useState([])

	async function handleSubmit(e) {
		e.preventDefault()
		if (!chatRoomName && !users) {
			toast.error("Please fill the form")
			return
		}

		const form = {
			users: selectedUsers,
			name: chatRoomName,
		}

		const res = await toast.promise(createChatRoom(form), {
			pending: "Creating chatroom…",
			success: "Chatroom created",
			error: "Failed to create chatroom",
		})

		console.log("res ", res)
	}

	const handleUserSearch = async searchKeyword => {
		if (!searchKeyword) return
		const { users: usersArray } = await searchUser(searchKeyword)
		setUsers(usersArray)
		console.log(usersArray)
	}

	const debouncedHandleUserSearch = useCallback(debounce(handleUserSearch, 500), [])

	useEffect(() => {
		debouncedHandleUserSearch(searchKeyword)
	}, [searchKeyword, debouncedHandleUserSearch])

	function selectUser(user) {
		if (!selectedUsers.includes(user)) {
			setSelectedUsers([...selectedUsers, user])
			return
		}

		toast.error("User is already selected")
	}

	function removeUser(user) {
		if (selectedUsers.includes(user)) {
			const filteredSelectedUser = selectedUsers.filter(u => u !== user)
			setSelectedUsers(filteredSelectedUser)
			return
		}
		toast.error("User is already removed")
	}

	return (
		<>
			<form className="py-3 px-7" onSubmit={handleSubmit}>
				<h2 className="text-4xl font-medium py-[1.5rem] px-[1rem]">Create Group Chat</h2>
				<div className="flex flex-col gap-2 w-full px-5">
					<InputField placeholder="Chat Name" setterFn={setChatRoomName} />
					<InputField placeholder="Add Users eg: Jane" setterFn={setSearchKeyword} />
					<div className="flex flex-wrap gap-2 overflow-hidden w-[20rem]">
						{selectedUsers.map(u => (
							<div
								key={u._id}
								className="bg-purple-600 p-2 rounded-md flex gap-2 items-center text-white font-semibold"
							>
								{u.name}
								<RxCross2
									onClick={() => removeUser(u)}
									className="cursor-pointer"
								/>
							</div>
						))}
					</div>
					<div>
						{users.length > 0 &&
							users.map(u => (
								<div
									key={u._id}
									className="bg-gray-200 px-3 py-2 rounded-md h-16 flex items-center gap-2 hover:bg-cyan-500 hover:text-white cursor-pointer mt-2"
									onClick={() => selectUser(u)}
								>
									<div className="flex-shrink-0">
										<img
											src={u.picture}
											alt={`${u.name}'s profile`}
											className="w-12 h-12 rounded-full"
											width={15}
										/>
									</div>
									<div>
										<h4 className="font-normal capitalize text-lg">
											{u.name.length > 7 ? u.name.slice(0, 12) + "…" : u.name}
										</h4>
										<p>
											<span className="font-semibold">Email</span>: {u.email}
										</p>
									</div>
								</div>
							))}
					</div>
				</div>
				<div className="px-4 mt-2 w-full">
					<button
						className="ml-2 bg-[#3182CE] py-1 px-4 rounded-md text-white text-lg font-semibold hover:bg-[#25639d]"
						type="submit"
					>
						Create Chat
					</button>
				</div>
			</form>
			<ToastConfig />
		</>
	)
}