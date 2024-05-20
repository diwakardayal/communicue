import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { searchUser } from "../../services/user"
import InputField from "../InputField"
import { toast } from "react-toastify"
import { ToastConfig } from "../../utils/component"
import Loader from "../Loader"
import { useChat } from "../../hooks"

export default function SearchUserSideBar() {
	const [isSideBarOpen, setIsSideBarOpen] = useState(false)
	const [searchKeyword, setSearchkeyword] = useState()
	const [searchResults, setSearchResults] = useState([])
	const [isFetching, setIsFetching] = useState(false)

	const { setCurrentChat } = useChat()

	async function handleUserSearch() {
		try {
			setIsFetching(true)
			const { users } = await searchUser(searchKeyword)
			console.log(users)
			setSearchResults(users)
			setIsFetching(false)
		} catch (error) {
			setIsFetching(false)
			toast.error("Failed to fetch users!")
		}
	}

	async function selectUser(chat) {
		console.log(chat)
		setCurrentChat({
			name: chat.name,
			id: chat._id,
		})
	}

	return (
		<>
			<button
				className="flex items-center justify-center gap-2 text-[16px] font-extrabold cursor-pointer rounded-md py-2 px-5 interactive-onFocus"
				onClick={() => setIsSideBarOpen(true)}
			>
				<FaSearch />
				<p className="font-semibold md:block hidden">Search User</p>
			</button>

			{isSideBarOpen && (
				<div
					className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 z-50"
					onClick={() => setIsSideBarOpen(false)}
				>
					<div
						className={`fixed w-[21rem] h-full bg-white transition-all duration-500  `}
						onClick={e => e.stopPropagation()} // Prevents closing when clicking inside the sidebar
					>
						<div className="p-4 ">
							<h2 className="text-xl font-semibold p-2">Search User</h2>
							<hr className="mt-6" />
							<div className="flex gap-2 mt-2 justify-between ">
								<InputField
									placeholder="search by name or email"
									setterFn={setSearchkeyword}
								/>

								<button
									className="bg-gray-200 px-4 rounded-md font-semibold hover:bg-gray-300 transition-all"
									onClick={handleUserSearch}
								>
									Go
								</button>
							</div>
							<div className="w-full h-[calc(100vh-200px)] overflow-y-auto hide-scrollbar ">
								{isFetching && (
									<div className="flex justify-center mt-4">
										<Loader size={50} />
									</div>
								)}
								{!isFetching &&
									searchResults.length > 0 &&
									searchResults.map(u => (
										<div
											key={u._id}
											className="bg-gray-200 px-3 py-2 rounded-md h-16 flex items-center gap-2 hover:bg-cyan-500 hover:text-white cursor-pointer mt-2"
											onClick={() => selectUser(u)}
										>
											<div className="flex-shrink-0">
												<img
													src={u.picture}
													alt={`${u.name}'s profile`}
													className="w-10 h-10 rounded-full"
													width={1}
												/>
											</div>
											<div>
												<h4 className="font-medium capitalize text-base">
													{u.name.length > 7
														? u.name.slice(0, 12) + "…"
														: u.name}
												</h4>
												<p>
													<span className="font-semibold text-xs">
														Email
													</span>
													: {u.email}
												</p>
											</div>
										</div>
									))}
							</div>
						</div>
					</div>
				</div>
			)}
			<ToastConfig />
		</>
	)
}
