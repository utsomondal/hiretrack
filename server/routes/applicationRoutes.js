const express = require("express");
const router = express.Router();

const {
  addApplication,
  getApplications,
} = require("../controllers/applicationController.js");
const { protect } = require("../middleware/auth.js");



// Create application
router.post("/", protect, addApplication);

// Get applications
router.get("/", protect, getApplications);

module.exports = router;
