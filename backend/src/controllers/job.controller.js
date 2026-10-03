const jobService = require("../services/job.service");

const createJob = async (req, res) => {
    try {
        const job = await jobService.createJob({
            ...req.body,
            freelancerId: req.user.userId,
        });

        res.status(201).json({
            success: true,
            message: "Job created successfully",
            data: {
                job,
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createJob,
};