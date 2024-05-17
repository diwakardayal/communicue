import { useState } from "react"
import InputField from "./InputField"
import { ToastContainer, toast } from "react-toastify"
import { signup } from "../services/user"
import { useAuth } from "../hooks"
import { useNavigate } from "react-router-dom"
import { validateFormFields } from "../utils"

export default function SignUpForm() {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [picture, setPicture] = useState("")

	const navigate = useNavigate()

	const { setUserInfoHandler } = useAuth()

	async function handlePicture({ target }) {
		const { files } = target
		const file = files[0]
		setPicture(URL.createObjectURL(file))
	}

	async function handleSubmit(e) {
		e.preventDefault()
		const { error } = validateFormFields(name, email, password)

		if (error) {
			toast.warning(error)
			return
		}

		if (!name || !email || !password) {
			if (password !== confirmPassword) {
				toast.warning("Password does not match")
				return
			}
		} else {
			const form = new FormData()

			form.append("name", name)
			form.append("email", email)
			form.append("password", password)
			if (picture) form.append("picture", picture)

			const res = await toast.promise(signup(form), {
				pending: "Processing…",
				success: "Registration complete. Redirecting…",
				error: "Registration failed. Please try again.",
			})

			if (res) {
				setTimeout(() => {
					setUserInfoHandler(res)
					navigate("/chat")
				}, 1000)
			}
		}
	}

	return (
		<>
			<form className="bg-white flex flex-col px-3 gap-2" onSubmit={handleSubmit}>
				<InputField placeholder="Enter Name" setterFn={setName} type="text" />
				<InputField placeholder="Email" setterFn={setEmail} type="text" />
				<InputField placeholder="Enter Password" setterFn={setPassword} type="password" />
				<InputField
					placeholder="Confirm Password"
					setterFn={setConfirmPassword}
					type="password"
				/>
				<label htmlFor="picture" className="font-semibold mt-2">
					Upload Picture
				</label>
				<input
					onChange={handlePicture}
					id="picture"
					type="file"
					name="picture"
					className="border-2 border-gray-300 hover:outline-blue-700 focus:outline-2 focus:outline-blue-700 rounded-md transition-all px-3 py-2 font-normal "
				/>
				<button
					className="bg-[#3383CE] text-white py-1 rounded-md font-semibold hover:bg-[#3383ceed]"
					type="submit"
				>
					Sign up
				</button>
			</form>
			<ToastContainer />
		</>
	)
}
