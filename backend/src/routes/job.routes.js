const express = require("express");

const jobController = require("../controllers/job.controller");
const authenticate = require("../middleware/auth.middleware");
const requireRole = require("../middleware/role.middleware");

const router = express.Router();

router.post("/",authenticate,requireRole("FREELANCER"),jobController.createJob);

module.exports = router;