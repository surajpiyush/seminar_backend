const express = require("express");
const userRouter = require("./Routes/User.route");
const { connectDB } = require("./Database/Connection");
const path = require("path");
const Razorpay = require("razorpay");
const bookingRouter = require("./Routes/booking.route");
require("dotenv").config();
connectDB();

const cors = require('cors');
const app = express();
app.use(cors({
	origin: '*' // Allow requests from this origin
  }));
module.exports.instance = new Razorpay({
	key_id: process.env.RAZORPAY_API_KEY,
	key_secret: process.env.RAZORPAY_APT_SECRET,
});
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", userRouter);
app.use("/api/v2", bookingRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
