import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"
import { ChatContext } from "../context/ChatProvider"

export const useAuth = () => useContext(AuthContext)
export const useChat = () => useContext(ChatContext)
