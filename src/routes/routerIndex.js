const express = require("express")
const userRoute = require("./userRoute")
const chatRoute = require("./chatRoute")
const messageRoute = require("./messageRoute")

const router = express.Router()

router.use("/api/user", userRoute)
router.use("/api/chat", chatRoute)
router.use("/api/message", messageRoute)

module.exports = router
