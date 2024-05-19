import ChatHeader from "../components/Chat/ChatHeader"
import ChatWindow from "../components/Chat/ChatWindow"
import MyChatList from "../components/Chat/MyChatList"
export default function ChatPage() {
	return (
		<>
			<ChatHeader />
			<div className="flex gap-2 h-[92vh] p-2">
				<MyChatList />
				<ChatWindow />
			</div>
		</>
	)
}
