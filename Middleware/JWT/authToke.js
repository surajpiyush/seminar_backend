const UserModel = require("../../Models/User.model");
const { verifyToken } = require("./JwtAuthToken");



const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = verifyToken (token);
        req.user = await UserModel.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(401).json({status:false, message: 'Unauthorized' });
    }
};

module.exports = authMiddleware;
