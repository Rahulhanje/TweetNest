import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        // Check if token is present
        if (!token) {
            return res.status(401).json({ message: "Please login" }); // Use `return`
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" }); // Use `return`
        }

        // Find user in database
        const user = await User.findById(decoded._id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" }); // Use `return`
        }

        // Attach user to request
        req.user = user;
        next(); // Proceed to next middleware
    } catch (err) {
        console.error("Error in protectRoute middleware:", err.message);
        return res.status(500).json({ message: "Server error" }); // Use `return`
    }
};
