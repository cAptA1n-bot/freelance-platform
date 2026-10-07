const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },

        applicantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        coverLetter: {
            type: String,
            required: true,
            trim: true,
            minlength: 20,
            maxlength: 2000,
        },

        proposedBudget: {
            type: Number,
            required: true,
            min: 0,
        },

        status: {
            type: String,
            enum: [
                "PENDING",
                "SHORTLISTED",
                "ACCEPTED",
                "REJECTED",
                "WITHDRAWN",
            ],
            default: "PENDING",
        },
    },
    { timestamps: true }
);

applicationSchema.index(
    { jobId: 1, applicantId: 1 },
    { unique: true }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;