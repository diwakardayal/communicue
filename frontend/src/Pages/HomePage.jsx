import { useState } from "react"
import SignInForm from "../components/SignInForm"
import SignUpForm from "../components/SignUpForm"

export default function HomePage() {
	const [isLogInTabVisible, setIsLogInTabVisible] = useState(true)

	return (
		<>
			<div className="pt-10 px-2">
				<div className="text-4xl bg-white py-3 rounded-md text-center w-96 m-auto flex justify-center items-center gap-2">
					<h1 className="font-semibold">CommuniCue</h1>{" "}
					<span>
						<img src="/svgs/bubble.svg" width={30} />
					</span>
				</div>
				<div className="bg-white w-96 m-auto mt-3 flex justify-around py-3 px-4 rounded-tl-md rounded-tr-md  ">
					<div
						className={`flex-1 px-3 py-2 cursor-pointer ${
							isLogInTabVisible
								? "rounded-3xl bg-[#BEE3F8]"
								: "hover:rounded-3xl hover:bg-[#BEE3F8]"
						} text-center font-semibold text-[#315283] transition-all`}
						onClick={() => setIsLogInTabVisible(true)}
					>
						Login
					</div>
					<div
						className={`flex-1 px-3 py-2 cursor-pointer ${
							!isLogInTabVisible
								? "rounded-3xl bg-[#BEE3F8]"
								: "hover:rounded-3xl hover:bg-[#BEE3F8]"
						} text-center font-semibold text-[#315283] transition-all`}
						onClick={() => setIsLogInTabVisible(false)}
					>
						Sign Up
					</div>
				</div>
				<div className="bg-white py-3 px-4 w-96 m-auto rounded-b-md pb-8">
					{isLogInTabVisible ? <SignInForm /> : <SignUpForm />}
				</div>
			</div>
		</>
	)
}
