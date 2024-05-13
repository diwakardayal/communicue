require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const routerIndex = require("./routes/routerIndex")

require("./db/connection")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(routerIndex)

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on ${process.env.PORT || 3000}`)
})
