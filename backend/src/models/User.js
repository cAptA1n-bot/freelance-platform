const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },

        lastName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false,
        },

        role: {
            type: String,
            enum: ["FREELANCER", "FRESHER"],
            required: true,
        },

        bio: {
            type: String,
            maxlength: 500,
            default: "",
        },

        profilePicture: {
            type: String,
            default: "",
        },

        skills: {
            type: [String],
            default: [],
        },

        github: {
            type: String,
            default: "",
        },

        portfolio: {
            type: String,
            default: "",
        },

        experienceLevel: {
            type: String,
            enum: ["BEGINNER", "INTERMEDIATE", "EXPERIENCED"],
            default: "BEGINNER",
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;