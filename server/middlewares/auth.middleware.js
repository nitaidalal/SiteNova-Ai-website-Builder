import jwt from 'jsonwebtoken';
import ApiResponse from '../config/ApiResponse.js';

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json(new ApiResponse(401, null, "Unauthorized: No token provided"));
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json(new ApiResponse(401, null, "Unauthorized: Invalid token"));
    }
}

export default authMiddleware;