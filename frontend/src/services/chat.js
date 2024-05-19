import axios from "axios"

async function createChatRoom(formData) {
	const res = await axios.post("/api/chat/group", formData)
	return res.data
}

async function fetchChatsAndLatestMsg() {
	const res = await axios.get("/api/chat/")
	return res.data
}

export { createChatRoom, fetchChatsAndLatestMsg }
