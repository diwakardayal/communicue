const express = require("express")
const { authUser, registerUser, getUsers } = require("../controllers/userController")
const { uploadImage } = require("../middleware/multer")

const router = express.Router()

router.route("/").post(uploadImage.single("picture"), registerUser).get(getUsers)
router.route("/auth").post(authUser)

module.exports = router
