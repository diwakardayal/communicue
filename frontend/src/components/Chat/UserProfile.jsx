/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react"
import { CgProfile } from "react-icons/cg"
import { FaChevronDown } from "react-icons/fa6"
import Modal from "../Modal"

export default function UserProfile() {
	const [isProfileMenuClicked, setIsProfileMenuClicked] = useState(false)
	const [isMyProfileClicked, setIsMyProfileClicked] = useState(false)

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
				<ProfileMenu setIsMyProfileClicked={setIsMyProfileClicked} menuRef={menuRef} />
			)}

			<Modal
				isModalVisible={isMyProfileClicked}
				name="Diwakar"
				profilePicture="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
				email="diwakar@gmail.com"
				closeModal={() => setIsMyProfileClicked(false)}
			/>
		</>
	)
}

const ProfileMenu = ({ setIsMyProfileClicked, menuRef }) => {
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
			<button className="px-[6.4px] py-[12.8px] hover:bg-slate-300 w-full transition-all 200ms ease-in-out">
				Logout
			</button>
		</div>
	)
}
