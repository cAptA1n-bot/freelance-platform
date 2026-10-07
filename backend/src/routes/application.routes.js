const express = require("express");

const applicationController = require("../controllers/application.controller");
const authenticate = require("../middleware/auth.middleware");
const requireRole = require("../middleware/role.middleware");

const router = express.Router();

router.post("/jobs/:jobId/applications",authenticate,requireRole("FRESHER"),applicationController.createApplication);
router.get("/jobs/:jobId/applications",authenticate,requireRole("FREELANCER"),applicationController.getApplicationsForJob);

module.exports = router;