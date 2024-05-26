const mongoose = require("mongoose");
const uri = "mongodb://0.0.0.0:27017/Seminar";

const options = {};

module.exports.connectDB = async () => {
	try {
		await mongoose.connect(uri, options);
		console.log("Successfully connected to the database");
	} catch (err) {
		console.error("Error connecting to the database:", err);
	}
};
