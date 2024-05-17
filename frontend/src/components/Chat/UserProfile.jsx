/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react"
import { CgProfile } from "react-icons/cg"
import { FaChevronDown } from "react-icons/fa6"
import Modal from "../Modal"
import { useAuth } from "../../hooks"

export default function UserProfile() {
	const [isProfileMenuClicked, setIsProfileMenuClicked] = useState(false)
	const [isMyProfileClicked, setIsMyProfileClicked] = useState(false)

	const { handleLogout } = useAuth()
	const menuRef = useRef(null)

	function handleClickOutside(event) {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			setIsProfileMenuClicked(false)
		}
	}

	useEffect(() => {
		if (isProfileMenuClicked) {
			document.addEventListener("mousedown", handleClickOutside)
		} else {
			document.removeEventListener("mousedown", handleClickOutside)
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [isProfileMenuClicked])

	return (
		<>
			<button
				className="cursor-pointer flex items-center gap-2 px-2 py-1  hover:bg-slate-100 rounded-md  interactive-onFocus"
				onClick={() => setIsProfileMenuClicked(value => !value)}
			>
				<CgProfile size={30} color="gray" />
				<FaChevronDown size={10} />
			</button>
			{isProfileMenuClicked && (
				<UserProfileMenu
					setIsMyProfileClicked={setIsMyProfileClicked}
					menuRef={menuRef}
					handleLogout={handleLogout}
				/>
			)}

			<Modal
				isModalVisible={isMyProfileClicked}
				closeModal={() => setIsMyProfileClicked(false)}
			>
				<MyProfile closeModal={() => setIsMyProfileClicked(false)} />
			</Modal>
		</>
	)
}

const UserProfileMenu = ({ setIsMyProfileClicked, menuRef, handleLogout }) => {
	return (
		<div
			ref={menuRef}
			className="absolute top-12 font-normal py-[8px] bg-white text-black w-[150px] h-[115px] rounded-md"
		>
			<button
				className="px-[6.4px] py-[12.8px] hover:bg-slate-300 w-full transition-all 200ms ease-in-out"
				onClick={() => setIsMyProfileClicked(value => !value)}
			>
				My Profile
			</button>
			<hr />
			<button
				className="px-[6.4px] py-[12.8px] hover:bg-slate-300 w-full transition-all 200ms ease-in-out"
				onClick={handleLogout}
			>
				Logout
			</button>
		</div>
	)
}

function MyProfile({ closeModal }) {
	const { user } = useAuth()

	return (
		<div className="p-6 flex flex-col items-center">
			<h1 className="text-2xl font-bold mb-4 text-gray-800 capitalize">{user?.name}</h1>
			<img
				src={user?.picture}
				alt={`${user?.name}'s profile`}
				className="w-24 h-24 rounded-full mb-4"
			/>
			<div className="text-center">
				<div className="mb-2 text-2xl font-normal text-gray-700 ">Email: {user?.email}</div>
				<button
					className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition-all"
					onClick={closeModal}
				>
					Close
				</button>
			</div>
		</div>
	)
}
