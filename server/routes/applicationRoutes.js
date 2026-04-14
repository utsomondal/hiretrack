const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.js");
const {
  addApplication,
  getApplications,
  updateApplication,
  deleteApplication,
  getApplicationById,
  getApplicationStats,
} = require("../controllers/applicationController.js");

// Create application
router.post("/", protect, addApplication);

// Get applications
router.get("/", protect, getApplications);

// Get application stats
router.get("/stats", protect, getApplicationStats);

// Get single application
router.get("/:id", protect, getApplicationById);

// Update application
router.patch("/:id", protect, updateApplication);

// Delete application
router.delete("/:id", protect, deleteApplication);

module.exports = router;
