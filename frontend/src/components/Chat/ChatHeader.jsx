import SearchUserSideBar from "./SearchUserSideBar"
import ChatNotification from "./ChatNotification"
import UserProfile from "./UserProfile"

export default function ChatHeader() {
	return (
		<>
			<div className="bg-white border-2 border-[#E2E8F0]  py-[5px]  px-[10px] flex justify-between items-center">
				<div className=" ">
					<SearchUserSideBar />
				</div>
				<div className="">
					<div className="text-2xl">CommuniCue</div>
				</div>
				<div className=" relative flex justify-end   items-center">
					<ChatNotification />
					<UserProfile />
				</div>
			</div>
		</>
	)
}
