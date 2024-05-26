const mongoose = require("mongoose");

const docsSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		aadhaarCard: {
			type: String,
		},
		educationalDoc: {
			type: String,
		},
		internCertificate: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Docs", docsSchema);
