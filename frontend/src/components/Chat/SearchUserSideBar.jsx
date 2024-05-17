import { useState } from "react"
import { FaSearch } from "react-icons/fa"

export default function SearchUserSideBar() {
	const [isSideBarOpen, setIsSideBarOpen] = useState(false)

	return (
		<>
			<button
				className="flex items-center justify-center gap-2 text-[16px] font-extrabold cursor-pointer rounded-md py-2 px-5 interactive-onFocus"
				onClick={() => setIsSideBarOpen(true)}
			>
				<FaSearch />
				<p className="font-semibold md:block hidden">Search User</p>
			</button>

			{/* {isSideBarOpen && (
				<div
					className="fixed top-0 left-0 bottom-0  right-0 bg-black bg-opacity-50 z-50"
					onClick={() => setIsSideBarOpen(false)}
				>
					<div
						className={`  h-full bg-white sidebar transition-all duration-500 ease-in-out`}
						onClick={e => e.stopPropagation()} // Prevents closing when clicking inside the sidebar
					>
						<button
							className="absolute top-4 right-4 text-gray-700"
							onClick={() => setIsSideBarOpen(false)}
						>
							Close
						</button>
						<div className="p-4">
							<h2 className="text-xl font-semibold p-2">Search User</h2>
							<hr className="mt-6" />
							<div className="flex gap-2 mt-2">
								<input
									placeholder="search by name or email"
									className="p-2 interactive-onFocus rounded-sm bg-white "
								/>
								<button className="bg-gray-200 p-2 px-3 rounded-md font-semibold hover:bg-gray-300 transition-all">
									Go
								</button>
							</div>
						</div>
					</div>
				</div>
			)} */}

			{isSideBarOpen && (
				<div
					className="fixed top-0 left-0 bottom-0 right-0   bg-black bg-opacity-50 z-50"
					onClick={() => setIsSideBarOpen(false)}
				>
					<div
						className={`h-full bg-white  w-1/4 transition-all duration-500  `}
						onClick={e => e.stopPropagation()} // Prevents closing when clicking inside the sidebar
					>
						<div className="p-4">
							<h2 className="text-xl font-semibold p-2">Search User</h2>
							<hr className="mt-6" />
							<div className="flex gap-2 mt-2">
								<input
									placeholder="search by name or email"
									className="p-2 outline-1 outline-gray-900 outline interactive-onFocus rounded-sm bg-white "
								/>
								<button className="bg-gray-200 p-2 px-3 rounded-md font-semibold hover:bg-gray-300 transition-all">
									Go
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
