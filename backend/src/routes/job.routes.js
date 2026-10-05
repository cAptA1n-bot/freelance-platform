const express = require("express");

const jobController = require("../controllers/job.controller");
const authenticate = require("../middleware/auth.middleware");
const requireRole = require("../middleware/role.middleware");

const router = express.Router();

router.post("/",authenticate,requireRole("FREELANCER"),jobController.createJob);
router.get("/", authenticate, jobController.getJobs);
router.get("/:jobId",authenticate,jobController.getJobById);
router.patch("/:jobId",authenticate,requireRole("FREELANCER"),jobController.updateJob);
router.delete("/:jobId",authenticate,requireRole("FREELANCER"),jobController.deleteJob);

module.exports = router;