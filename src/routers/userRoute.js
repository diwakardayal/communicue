const express = require("express")
const { authUser, registerUser } = require("../controller/userController")
const { uploadImage } = require("../middleware/multer")

const router = express.Router()

router.route("/").post(uploadImage.single("picture"), registerUser)
router.route("/auth").post(authUser)

module.exports = router
