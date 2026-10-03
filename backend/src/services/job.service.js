const Job = require("../models/Job");

const createJob = async ({
    title,
    description,
    skills,
    experienceLevel,
    budget,
    duration,
    workType,
    freelancerId,
}) => {
    if (
        !title ||
        !description ||
        !skills ||
        !experienceLevel ||
        budget === undefined ||
        !duration
    ) {
        throw new Error("All required fields must be provided");
    }

    if (!Array.isArray(skills) || skills.length === 0) {
        throw new Error("At least one skill is required");
    }

    const job = await Job.create({
        title,
        description,
        skills,
        experienceLevel,
        budget,
        duration,
        workType,
        freelancerId,
    });

    return job;
};

module.exports = {
    createJob,
};