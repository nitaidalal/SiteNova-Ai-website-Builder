import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
    try {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '4d' });
    } catch (error) {
        throw new Error("Error generating token");
    }
}