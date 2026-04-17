import {User} from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if (!username||!email||!password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const existing = await User.findOne({email: email.toLowerCase()});
        
        if (existing) {
            return res.status(409).json({
                message: "User already exists"
            })
        }

        const user = await User.create({username, email: email.toLowerCase(), password, loggedIn: false});

        return res.status(201).json({
            message: "User registered successfully",
            user: {id:user._id, username: user.username, email: user.email }
        })
    } catch (error) {
        return res.status(500).json({
            message: "internal Server error",
            error: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const user = await User.findOne({email: email.toLowerCase()});
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }
        return res.status(200).json({
            message: "Logged in!",
            user: {id: user._id, username: user.username, email: user.email}
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        const {email} = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            })
        }
        const user = await User.findOne({email: email.toLowerCase()});
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        // Perform logout logic here (e.g., invalidate token, update last seen, etc.)
        return res.status(200).json({
            message: "Logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export {registerUser, loginUser, logoutUser};