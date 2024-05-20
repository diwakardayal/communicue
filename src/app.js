require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const path = require("path")
const routerIndex = require("./routes/routerIndex")
const { notFound, errorHandler } = require("./middleware/errorMiddlware")

require("./db/connection")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(routerIndex)

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on ${process.env.PORT || 3000}`)
})

const dirname = path.resolve()
app.use(express.static(path.join(dirname, "/frontend/dist")))
app.get("*", (req, res) => res.sendFile(path.resolve(dirname, "frontend", "dist", "index.html")))

app.use(notFound)
app.use(errorHandler)
