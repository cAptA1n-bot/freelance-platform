const express = require("express");

const userController = require("../controllers/user.controller");
const authenticate = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/me", authenticate, userController.getMyProfile);
router.patch("/me",authenticate,userController.updateMyProfile);
router.get("/:userId",authenticate,userController.getUserById);

module.exports = router;