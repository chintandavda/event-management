const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register User
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        user = new User({ name, email, password, role });
        await user.save();

        res.status(201).json({ message: "User registered successfully", token: generateToken(user) });
    } catch (error) {
        console.error("Error in Register:", error); // Log the exact error
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        res.status(200).json({ token: generateToken(user) });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
