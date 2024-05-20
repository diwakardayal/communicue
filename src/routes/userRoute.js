const express = require("express")
const { authUser, registerUser, searchUsers } = require("../controllers/userController")
const { uploadImage } = require("../middleware/multer")
const { requireAuth } = require("../middleware/auth")

const router = express.Router()

router.route("/").post(uploadImage.single("picture"), registerUser).get(requireAuth, searchUsers)
router.route("/auth").post(authUser)

module.exports = router
