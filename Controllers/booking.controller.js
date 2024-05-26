const expressAsyncHandler = require("express-async-handler");
const Booking = require("../Models/Booking.model");

module.exports.createBooking = expressAsyncHandler(async (req, res) => {
	try {
		const userId = req.user._id;
		const { collegeName, profession, bookingStatus, paymentStatus } = req.body;

		const createBooking =await Booking.create({
			userId: userId,
			collegeName,
			profession,
			bookingStatus,
			paymentStatus,
			});

		return res.status(201).json({
			status: true,
			message: "Booking created successfully",
			response: createBooking,
		});
	} catch (error) {
		return res.status(500).json({
			status: true,
			message: error.message,
			response: "",
		});
	}
});

module.exports.bookingList=expressAsyncHandler(async(req,res)=>{
	const list=await Booking.find()
	console.log("jqduiegu",list)
	return res.status(200).json({
		status: true,
		message: "Booking list",
		response: list,
	});
})




