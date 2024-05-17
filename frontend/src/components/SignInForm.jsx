/* eslint-disable react/prop-types */

import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import InputField from "./InputField"
import { validateFormFields } from "../utils"
import { login } from "../services/user"
import { useAuth } from "../hooks"
import { useNavigate } from "react-router-dom"

/* eslint-disable react/jsx-no-duplicate-props */
export default function SignInForm() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const navigate = useNavigate()

	const { setUserInfoHandler } = useAuth()

	async function handleSubmit(e) {
		e.preventDefault()
		const { error } = validateFormFields(email, password)

		if (error) {
			toast.warning(error)
			return
		}

		const form = {
			email,
			password,
		}

		const res = await toast.promise(login(form), {
			pending: "Processing…",
			success: "Logged In. Redirecting…",
			error: "Logging failed. Please try again.",
		})

		if (res) {
			setTimeout(() => {
				setUserInfoHandler(res?.user)
				navigate("/chat")
			}, 1000)
		}
	}

	return (
		<>
			<form className="bg-white flex flex-col px-3 gap-2" onSubmit={handleSubmit}>
				<InputField placeholder="Email" setterFn={setEmail} />
				<InputField placeholder="Enter Password" setterFn={setPassword} />
				<button
					className="bg-[#3383CE] text-white py-1 rounded-md font-semibold hover:bg-[#3383ceed]"
					type="submit"
				>
					Login
				</button>
			</form>
			<ToastContainer />
		</>
	)
}
