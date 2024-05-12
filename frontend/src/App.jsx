import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import ChatPage from "./Pages/ChatPage"
import "./App.css"
import "react-toastify/dist/ReactToastify.css"

import PrivateRoute from "./components/PrivateRoute"

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="" element={<PrivateRoute />}>
					<Route path="/chat" element={<ChatPage />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App
