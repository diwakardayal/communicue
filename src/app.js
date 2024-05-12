require("dotenv").config()
const express = require("express")
const routerIndex = require("./routers/routerIndex")
require("./db/connection")

const app = express()

app.use(express.json())
app.use(routerIndex)

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on ${process.env.PORT || 3000}`)
})
