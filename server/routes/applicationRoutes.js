const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.js");
const {
  addApplication,
  getApplications,
  deleteApplication,
} = require("../controllers/applicationController.js");

// Create application
router.post("/", protect, addApplication);

// Get applications
router.get("/", protect, getApplications);

// Update application

// Delete application
router.delete("/:id", protect, deleteApplication);

module.exports = router;
