import axios from "axios"

async function fetchConversationById(chatId) {
	const res = await axios.get("/api/message/" + chatId)

	return res.data
}

async function sendMessageInChat(formData) {
	const res = await axios.post("/api/message/", formData)

	return res.data
}

export { fetchConversationById, sendMessageInChat }
