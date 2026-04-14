const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.js");
const {
  addApplication,
  getApplications,
  updateApplication,
  deleteApplication,
  getApplicationById,
} = require("../controllers/applicationController.js");

// Create application
router.post("/", protect, addApplication);

// Get applications
router.get("/", protect, getApplications);

// Get single application
router.get("/:id", protect, getApplicationById);

// Update application
router.patch("/:id", protect, updateApplication);

// Delete application
router.delete("/:id", protect, deleteApplication);

module.exports = router;
