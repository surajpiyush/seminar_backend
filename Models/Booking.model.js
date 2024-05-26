const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	collegeName: {
		type: String,
	},
    profession: {
		type: String,
        enum: ["student", "working"],
		default: "student",
	},
	paymentStatus: {
		type: String,
		enum: ["pending", "paid"],
		default: "pending",
	},
	bookingStatus: {
		type: String,
		enum: ["pending", "confirmed"],
		default: "pending",
	},
	
});

module.exports = mongoose.model("Booking", bookingSchema);
