const userService = require("../services/user.service");

const getMyProfile = async (req, res) => {
    try {
        const user = await userService.getMyProfile(req.user.userId);

        res.status(200).json({
            success: true,
            data: {
                user,
            },
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const updateMyProfile = async (req, res) => {
    try {
        const user = await userService.updateMyProfile(
            req.user.userId,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: {
                user,
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.userId);

        res.status(200).json({
            success: true,
            data: {
                user,
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
    getMyProfile,
    updateMyProfile,
    getUserById,
};