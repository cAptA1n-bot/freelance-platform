const bcrypt = require("bcrypt");
const validator = require("validator");

const { generateToken } = require("../utils/jwt");

const User = require("../models/User");

const registerUser = async ({
    firstName,
    lastName,
    email,
    password,
    role,
}) => {
    // Validate required fields
    if (!firstName || !lastName || !email || !password || !role) {
        throw new Error("All required fields must be provided");
    }

    // Validate email
    if (!validator.isEmail(email)) {
        throw new Error("Invalid email address");
    }

    // Validate role
    if (!["FREELANCER", "FRESHER"].includes(role)) {
        throw new Error("Invalid role");
    }

    // Validate password
    if (!validator.isStrongPassword(password)) {
        throw new Error(
            "Password must contain at least 8 characters, including uppercase, lowercase, number and symbol"
        );
    }

    // Check if user already exists
    const existingUser = await User.findOne({
        email: email.toLowerCase(),
    });

    if (existingUser) {
        throw new Error("User already exists with this email");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
        role,
    });

    const token = generateToken(user._id.toString());

    return {
        user,
        token,
    };
};

const loginUser = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Invalid email address");
    }

    const user = await User.findOne({
        email: email.toLowerCase(),
    }).select("+password");

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    const token = generateToken(user._id.toString());

    return {
        user,
        token,
    };
};

const getCurrentUser = async (userId) => {
    const user = await User.findById(userId).select(
        "-password"
    );

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
};