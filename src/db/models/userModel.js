const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	picture: {
		type: String,
		required: true,
		default:
			"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
})

// To match the password with user hashed password in db
userSchema.methods.matchPassword = async function (enteredPassword) {
	// eslint-disable-next-line no-return-await
	return await bcrypt.compare(enteredPassword, this.password)
}

// Encrypting the password
userSchema.pre("save", async next => {
	if (!this.isModified("password")) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

userSchema.module.exports = mongoose.model("User", userSchema)
