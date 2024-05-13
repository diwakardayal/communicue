const express = require("express")
const {
	accessChat,
	fetchUserChats,
	createGroupChat,
	removeFromGroup,
	addToGroup,
	renameGroup,
} = require("../controllers/chatControllers")
const { requireAuth } = require("../middleware/auth")

const router = express.Router()

router.route("/").get(requireAuth, fetchUserChats).post(requireAuth, accessChat)
router.route("/group").post(requireAuth, createGroupChat)
router.route("/rename").put(requireAuth, renameGroup)
router.route("/groupremove").put(requireAuth, removeFromGroup)
router.route("/groupadd").put(requireAuth, addToGroup)

module.exports = router
