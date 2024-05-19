import { useAuth, useChat } from "../../hooks"
import InputField from "../InputField"

export default function ChatWindow() {
	const { user } = useAuth()
	user.id = "60a281bc502ec30428fb6bb0"

	const { currentChat, chatData } = useChat()

	return (
		<div className="bg-white w-full rounded-md p-4">
			{!currentChat && (
				<div className="flex justify-center items-center h-full">
					<p className="text-3xl text-center">Click on a user to start chatting</p>
				</div>
			)}
			{currentChat && (
				<>
					<div className="w-3/5 ">
						<h2 className="text-3xl px-2 pb-3"> CHAT NAME</h2>
					</div>

					<div className="h-[calc(100vh-170px)] bg-gray-200 rounded-md flex flex-col justify-between p-3">
						<div className="overflow-hidden overflow-y-auto hide-scrollbar">
							{chatData.map(c => (
								<div key={c._id} className="h-11 m-2">
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
												src={c.sender.pic}
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
						</div>
						<InputField placeholder="Enter a message…" />
					</div>
				</>
			)}
		</div>
	)
}
