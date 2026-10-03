const User = require("../models/User");

const requireRole = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.user.userId).select("role");

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "You do not have permission to perform this action",
                });
            }

            req.user.role = user.role;

            next();
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
};

module.exports = requireRole;