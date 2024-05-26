const asyncHandler = require("express-async-handler");
const User = require("../Models/User.model");
const {
	hashPassword,
	verifyPassword,
} = require("../Middleware/PasswordEncryptDecrypt");
const Docs = require("../Models/UserDocs.model");
const { generateToken } = require("../Middleware/JWT/JwtAuthToken");
module.exports.register = asyncHandler(async (req, res) => {
	const { name, password, email, aadharNumber, Mobile, userType, address } =
		req.body;
	const files = req.files || {};
	if (!name || !password || !email || !aadharNumber) {
		return res.status(400).json({
			status: false,
			message: "Missing required fields: name, password, email, aadharNumber",
			response: null,
		});
	}
	try {
		const alreadyUser = await User.findOne({
			email,
		});
		if (alreadyUser) {
			return res.status(409).json({
				status: true,
				message: "Email Already exist ",
				response: "",
			});
		}
		const hashedPassword = await hashPassword(password);
		const user = await User.create({
			name,
			password: hashedPassword,
			email,
			aadharNumber,
			Mobile,
			address,
			profilePic: files.image?.[0]?.filename,
			userType,
		});

		const token = generateToken(user);
		user.token = token;
		await user.save();

		const docs = await Docs.create({
			userId: user.id,
			aadhaarCard: files.document?.[0]?.filename,
			educationalDoc: files.document?.[1]?.filename,
			internCertificate: files.document?.[2]?.filename,
		});

		await docs.save();

		return res.status(201).json({
			status: true,
			message: "User Created",
			response: user,
		});
	} catch (error) {
		console.error("Error during registration:", error);
		return res.status(500).json({
			status: false,
			message: "Server error",
			response: null,
		});
	}
});

module.exports.updateProfile = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const { name, password, email, aadharNumber, Mobile, address } = req.body;
	const files = req?.files || {};

	try {
		let updateFields = {
			name,
			password,
			email,
			aadharNumber,
			Mobile,
			address,
		};

		if (files?.image && files.image.length > 0) {
			updateFields.profilePic = files?.image[0]?.filename;
		}

		const findUser = await User.findByIdAndUpdate(userId, updateFields, {
			new: true,
		});
		const docs = await Docs.findOne({ userId });
		console.log("this is findDocs", docs);
		if (docs) {
			(docs.aadhaarCard = files?.document?.[0]?.filename),
				(docs.educationalDoc = files?.document?.[1]?.filename),
				(docs.internCertificate = files?.document?.[2]?.filename);
		}
		await docs.save();
		if (!findUser) {
			return res.status(400).json({
				status: false,
				message: "User not found",
				response: null,
			});
		}

		return res.status(200).json({
			status: true,
			message: "Profile updated successfully",
			response: findUser,
		});
	} catch (error) {
		console.error("Error updating profile:", error);
		return res.status(500).json({
			status: false,
			message: "Server error",
			response: null,
		});
	}
});

module.exports.userLogin = async (req, res) => {
	try {
		const { email, password } = req.body;

		const findUser = await User.findOne({ email });

		if (!findUser) {
			return res.status(400).json({
				status: false,
				message: "Invalid email",
			});
		}
		let token = await generateToken(findUser);
		findUser.token = token;
		await findUser.save();
		let verify = verifyPassword(password, findUser.password);
		if (!verify) {
			return res.status(400).json({
				status: false,
				message: "Invalid password",
			});
		}
		return res.status(200).json({
			status: true,
			message: "User logged in",
			response: findUser,
		});
	} catch (error) {
		return res.status(200).json({
			status: true,
			message: error.message,
			response: "",
		});
	}
};

module.exports.userLogOut = async (req, res) => {
	try {
		const userId = req.user._id;
		const findUser = await User.findById(userId);
		findUser.token = "";
		await findUser.save();
		return res.status(200).json({
			status: true,
			message: "User logged out",
			response: "",
		});
	} catch (error) {
		return res.status(200).json({
			status: true,
			message: error.message,
			response: "",
		});
	}
};

module.exports.findUserById = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({
				status: false,
				message: "User not found",
				reponse: "",
			});
		}
		return res.status(200).json({
			status: true,
			message: "User details",
			reponse: user,
		});
	} catch (error) {
		return res.status(500).json({
			status: false,
			message: "Internal Server Error",
			response: error.message,
		});
	}
});

module.exports.userList = asyncHandler(async (req, res) => {
	try {
		const users = await User.find();

		return res.status(200).json({
			status: true,
			message: "Users List",
			response: users,
		});
	} catch (error) {
		console.error("Error fetching users:", error);
		return res.status(500).json({
			status: false,
			message: "Internal Server Error",
		});
	}
});
