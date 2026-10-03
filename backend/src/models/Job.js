const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 100,
        },

        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 20,
            maxlength: 2000,
        },

        skills: {
            type: [String],
            required: true,
            validate: {
                validator: (skills) => skills.length > 0,
                message: "At least one skill is required",
            },
        },

        experienceLevel: {
            type: String,
            enum: ["BEGINNER", "INTERMEDIATE", "EXPERIENCED"],
            required: true,
        },

        budget: {
            type: Number,
            required: true,
            min: 0,
        },

        duration: {
            type: String,
            required: true,
            trim: true,
        },

        workType: {
            type: String,
            enum: ["REMOTE", "HYBRID", "ONSITE"],
            default: "REMOTE",
        },

        freelancerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        status: {
            type: String,
            enum: ["OPEN", "CLOSED"],
            default: "OPEN",
        },
    },
    {
        timestamps: true,
    }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;