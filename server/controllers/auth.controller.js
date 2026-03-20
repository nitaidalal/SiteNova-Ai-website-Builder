import User from '../models/user.mode.js';
import ApiResponse from '../config/ApiResponse.js';
import { generateToken } from '../config/token.js';

export const googleAuth = async (req, res) => {
    try {
        const { name, email, avatar } = req.body;

        if (!email) {
            return res.status(400).json(new ApiResponse(400, null, "Email is required"));
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                avatar
            });
        }

        const token = generateToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 4 * 24 * 60 * 60 * 1000 // 4 days
        });

        res.status(200).json(new ApiResponse(200, { user, token }, "User authenticated successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};


export const logout = (req,res) => {
    try {
        res.clearCookie("token");
        res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
}