// Auth Controller js

import bcrypt from 'bcrypt';
import User from '../modals/User.modal.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';


const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;
const addSaltAndPepper = async (password) => {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const pepper = process.env.PEPPER || 'default_pepper';
    const hashedPassword = bcrypt.hashSync(password + pepper, salt);
    return hashedPassword;
};

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const isValid = checkInfo(name, email);

        if (!isValid) return res.status(400).json({ message: "Missing name or email" });

        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await addSaltAndPepper(password);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        generateTokenAndSetCookie(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        });


    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const isValid = checkLoginInfo(email, password);

        if (!isValid) return res.status(400).json({ message: "Missing email or password" });

        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "User does not exist" });

        const pepper = process.env.PEPPER || 'default_pepper';

        const isMatch = bcrypt.compareSync(password + pepper, user.password);

        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });

    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: error.message });
    }
}






function checkLoginInfo(email, password) {
    if (!email || !password) {
        console.log("Missing email or password");
        return false;
    }
    if (!email.includes("@")) {
        console.log("Invalid email");
        return false;
    }
    return true;
}

function checkInfo(name, email) {
    if (!name || !email) {
        console.log("Missing name or email");
        return false;
    }
    if (name < 3) {
        console.log("Name too short");
        return false;
    }
    if (!email.includes("@")) {
        console.log("Invalid email");
        return false;
    }
    return true;
}