const mongoose = require("mongoose")

try {
	mongoose
		.connect(process.env.MONGODB_CONNECTION_URL)
		.then(() => console.log("connection to db established"))
} catch (error) {
	console.log(error)
}
