const express = require("express")
const userRoute = require("./userRoute")

const router = express.Router()

router.use("/api/user", userRoute)
module.exports = router
