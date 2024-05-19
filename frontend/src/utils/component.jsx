import { ToastContainer } from "react-toastify"

const ToastConfig = () => (
	<ToastContainer
		position="top-right"
		autoClose={5000}
		hideProgressBar
		newestOnTop={false}
		closeOnClick
		rtl={false}
		pauseOnFocusLoss
		draggable
		pauseOnHover
		theme="light"
		transition="Bounce"
	/>
)

export { ToastConfig }
