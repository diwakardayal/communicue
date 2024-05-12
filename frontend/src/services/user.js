import axios from "axios"

async function login(user) {
	const res = await axios.post("/api/user/auth", user)

	return { user: res.data }
}

async function signup(user) {
	const res = await axios.post("/api/user", user, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	})

	return { user: res.data }
}

export { login, signup }
