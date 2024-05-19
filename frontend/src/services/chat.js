import axios from "axios"

async function createChatRoom(formData) {
	const res = await axios.post("/api/chat/group", formData)
	return res.data
}

export { createChatRoom }
