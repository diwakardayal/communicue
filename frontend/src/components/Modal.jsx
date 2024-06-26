import { useEffect, useRef } from "react"
import { RxCross2 } from "react-icons/rx"

/* eslint-disable react/prop-types */
export default function Modal({ isModalVisible, closeModal, children }) {
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
			<div className="bg-slate-600 inset-0 bg-opacity-75 fixed flex items-center justify-center z-50">
				<div
					ref={profileRef}
					className="bg-white w-1/4 rounded-lg shadow-lg min-w-fit  modal-animation"
				>
					<div className="relative right-3 top-2 float-right ml">
						<RxCross2 size={22} className="cursor-pointer" onClick={closeModal} />
					</div>
					<div className="flex flex-col items-center">{children}</div>
				</div>
			</div>
		</>
	)
}
