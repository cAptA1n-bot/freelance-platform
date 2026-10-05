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

const getJobs = async (req, res) => {
    try {
        const result = await jobService.getJobs(req.query);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getJobById = async (req, res) => {
    try {
        const job = await jobService.getJobById(req.params.jobId);

        res.status(200).json({
            success: true,
            data: {
                job,
            },
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const updateJob = async (req, res) => {
    try {
        const job = await jobService.updateJob(
            req.params.jobId,
            req.user.userId,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Job updated successfully",
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

const deleteJob = async (req, res) => {
    try {
        await jobService.deleteJob(
            req.params.jobId,
            req.user.userId
        );

        res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
};