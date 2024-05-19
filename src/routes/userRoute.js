const express = require("express")
const { authUser, registerUser, getUsers } = require("../controllers/userController")
const { uploadImage } = require("../middleware/multer")
const { requireAuth } = require("../middleware/auth")

const router = express.Router()

router.route("/").post(uploadImage.single("picture"), registerUser).get(requireAuth, getUsers)
router.route("/auth").post(authUser)

module.exports = router
