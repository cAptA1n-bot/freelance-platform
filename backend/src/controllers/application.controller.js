const applicationService = require("../services/application.service");

const createApplication = async (req, res) => {
    try {
        const application = await applicationService.createApplication({
            jobId: req.params.jobId,
            applicantId: req.user.userId,
            coverLetter: req.body.coverLetter,
            proposedBudget: req.body.proposedBudget,
        });

        res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            data: {
                application,
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getApplicationsForJob = async (req, res) => {
    try {
        const applications =
            await applicationService.getApplicationsForJob(
                req.params.jobId,
                req.user.userId
            );

        res.status(200).json({
            success: true,
            data: {
                applications,
            },
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createApplication,
    getApplicationsForJob
};