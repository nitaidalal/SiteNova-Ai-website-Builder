import ApiResponse from '../config/ApiResponse.js';
import User from '../models/user.mode.js';

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(404).json(new ApiResponse(404, null, "User not found"));
        }
        res.status(200).json(new ApiResponse(200, user, "User profile retrieved successfully"));
    } catch (error) {
        console.log("Error fetching user profile:", error);
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
}
