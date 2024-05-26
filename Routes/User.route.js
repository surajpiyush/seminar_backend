const express = require("express");
const {
	register,
	userLogin,
	findUserById,
	userList,
    updateProfile,
	userLogOut,
} = require("../Controllers/user.controller");
const { upload } = require("../Middleware/Multer");
const authMiddleware = require("../Middleware/JWT/authToke");
const userRouter = express.Router();

userRouter.post(
	"/register",
	
	register
);
userRouter.post("/updateProfile",authMiddleware, updateProfile);
userRouter.post("/login", userLogin);
userRouter.post("/logout",authMiddleware, userLogOut);
userRouter.get("/findById", authMiddleware, findUserById);
userRouter.get("/userList",authMiddleware, userList);
module.exports = userRouter;
