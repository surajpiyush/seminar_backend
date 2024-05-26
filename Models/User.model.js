const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
		},
		password: {
			type: String,
		},
		address: {
			type: String,
		},
		Mobile: {
			type: String,
		},
		aadharNumber: {
			type: Number,
		},
		profilePic: {
			type: String,
		},
		userType: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		token: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
