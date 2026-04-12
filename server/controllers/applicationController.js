const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

// Add application
const addApplication = async (req, res) => {
  try {
    const db = getDB();

    const application = {
      ...req.body,
      userId: req.user.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("applications").insertOne(application);

    res.status(201).json({
      success: true,
      message: "Application added successfully",
      data: {
        _id: result.insertedId,
        ...application,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding application" });
  }
};

// Get applications
const getApplications = async (req, res) => {
  try {
    const db = getDB();

    const applications = await db
      .collection("applications")
      .find({ userId: req.user.userId })
      .toArray();

    res.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications" });
  }
};

// Update application

// Delete application
const deleteApplication = async (req, res) => {
  try {
    const db = getDB();
    const applicationId = req.params.id;
    await db.collection("applications").deleteOne({
      _id: new ObjectId(applicationId),
      userId: req.user.userId,
    });
    res.json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting application" });
  }
};

module.exports = { addApplication, getApplications, deleteApplication };
