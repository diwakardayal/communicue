import { useEffect, useRef } from "react"

/* eslint-disable react/prop-types */
export default function CreateGroupChatModal({
	isModalVisible,
	name = "",
	profilePicture,
	email = "",
	closeModal,
}) {
	const profileRef = useRef(null)

	function handleCloseUserProfile(event) {
		if (profileRef.current && !profileRef.current.contains(event.target)) {
			closeModal()
		}
	}

	useEffect(() => {
		if (isModalVisible) {
			document.addEventListener("mousedown", handleCloseUserProfile)
		} else {
			document.removeEventListener("mousedown", handleCloseUserProfile)
		}

		return () => {
			document.removeEventListener("mousedown", handleCloseUserProfile)
		}
	}, [isModalVisible])

	if (!isModalVisible) return null
	return (
		<>
			<div className="bg-slate-600 inset-0 bg-opacity-75 fixed   flex items-center justify-center z-50">
				<div ref={profileRef} className="bg-white w-1/4  p-6 rounded-lg shadow-lg">
					<div className="flex flex-col items-center">
						<h1 className="text-2xl font-bold mb-4">{name}</h1>
						<img
							src={profilePicture}
							alt={`${name}'s profile`}
							className="w-24 h-24 rounded-full mb-4"
						/>
						<div className="text-center">
							<div className="mb-2">Email: {email}</div>
							<button
								className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition-all"
								onClick={closeModal}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
