/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
const jwt = require("jsonwebtoken")
const asyncHandler = require("../middleware/asyncHandler")
const User = require("../db/models/userModel")

const maxAge = 3 * 24 * 60 * 60
const createToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: maxAge,
	})
}

// @desc Auth user
// @route POST /api/user/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		const token = createToken(user._id)
		res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
		res.status(200).json({
			id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(401)
		throw new Error("Invalid email or password")
	}
})

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	const userExist = await User.findOne({ email })

	if (userExist) {
		res.status(400)
		throw new Error("User already exists")
	}

	const user = await new User({
		name,
		email,
		password,
	}).save()

	if (user) {
		// eslint-disable-next-line no-underscore-dangle
		res.status(201).json({
			id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(400)
		throw new Error("Invalid user data")
	}
})

module.exports = { authUser, registerUser }
