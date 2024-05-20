import { useEffect, useRef, useState } from "react"
import { useAuth, useChat } from "../../hooks"
import { fetchConversationById, sendMessageInChat } from "../../services/message"
import { ToastConfig } from "../../utils/component"
import Loader from "../Loader"
import { toast } from "react-toastify"

export default function ChatWindow() {
	const [chatConversation, setChatConversation] = useState([])
	const [isFetching, setIsFetching] = useState(false)
	const [message, setMessage] = useState(null)

	const { user } = useAuth()

	const { currentChat } = useChat()

	async function sendMessage() {
		const res = await sendMessageInChat({
			chatId: currentChat.id,
			content: message,
		})

		console.log(res)
		setMessage("")
		fetchConversation()
	}

	const chatEndRef = useRef(null)

	function scrollToBottom() {
		chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}

	async function fetchConversation() {
		try {
			const res = await fetchConversationById(currentChat.id)

			setChatConversation(res)
			setIsFetching(false)
			scrollToBottom()
		} catch (e) {
			console.log(e)
			toast.error("Failed to fetch conversation!")
		}
	}

	useEffect(() => {
		if (currentChat) {
			setIsFetching(true)
			fetchConversation()
		}
	}, [currentChat])

	useEffect(() => {
		scrollToBottom()
	}, [chatConversation])

	return (
		<>
			<div className="bg-white w-full rounded-md p-4">
				{!currentChat && (
					<div className="flex justify-center items-center h-full">
						<p className="text-3xl text-center">Click on a user to start chatting</p>
					</div>
				)}
				{isFetching && (
					<div className="flex justify-center items-center h-full">
						<Loader />
					</div>
				)}
				{!isFetching && currentChat?.id && (
					<>
						<div className="w-3/5 ">
							<h2 className="text-3xl px-2 pb-3">
								{currentChat.name && currentChat.name}
							</h2>
						</div>

						<div className="h-[calc(100vh-170px)] bg-gray-200 rounded-md flex flex-col justify-between p-3">
							<div className="overflow-hidden overflow-y-auto hide-scrollbar">
								{chatConversation.map((c, index) => (
									<div key={index} className="h-11 m-2">
										<div
											className={`flex gap-1 ${
												c.sender._id === user.id
													? `justify-end`
													: `justify-start`
											}`}
										>
											{c.sender._id !== user.id && (
												<img
													alt={c.sender.name}
													src={c.sender.picture}
													width={40}
													className="rounded-full"
												/>
											)}
											<p
												className={`py-2 px-3 font-normal text-lg rounded-2xl ${
													c.sender._id === user.id
														? `bg-blue-200 float-right`
														: `bg-green-200 float-left`
												}`}
											>
												{c.content}
											</p>
										</div>
									</div>
								))}
								<div ref={chatEndRef} />
							</div>

							<input
								value={message}
								placeholder="Enter a message…"
								className="border-2 border-gray-300 hover:outline-blue-700 focus:outline-2 focus:outline-blue-700 rounded-md transition-all px-3 py-2 font-normal "
								onChange={e => setMessage(e.target.value)}
								onKeyDown={e => {
									if (e.key === "Enter") sendMessage()
								}}
							/>
						</div>
					</>
				)}
			</div>
			<ToastConfig />
		</>
	)
}
