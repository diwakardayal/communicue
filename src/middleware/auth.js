const jsonWebToken = require("jsonwebtoken")
const User = require("../db/models/userModel")
const asyncHandler = require("./asyncHandler")

const requireAuth = asyncHandler(async (req, res, next) => {
	try {
		const token = req.cookies.jwt

		if (token) {
			const decode = jsonWebToken.verify(token, process.env.JWT_SECRET)
			const user = await User.findById(decode?.id)
			req.user = user

			next()
		} else {
			console.log("token no found")
			res.status(401)
			throw Error("Unauthenticated request")
		}
	} catch (e) {
		console.log(e)

		console.log("token no found")
		res.status(401)
		throw Error("Unauthenticated request")
	}
})

module.exports = { requireAuth }
