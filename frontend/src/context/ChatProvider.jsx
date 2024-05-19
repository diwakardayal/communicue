/* eslint-disable react/prop-types */
import { createContext, useState } from "react"

export const ChatContext = createContext()

export default function ChatProvider({ children }) {
	const [currentChat, setCurrentChat] = useState()
	const [chatData, setChatData] = useState()

	return (
		<ChatContext.Provider value={{ currentChat, chatData, setChatData, setCurrentChat }}>
			{children}
		</ChatContext.Provider>
	)
}
