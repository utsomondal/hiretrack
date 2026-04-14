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

// Get application by ID
const getApplicationById = async (req, res) => {
  try {
    const db = getDB();
    const applicationId = req.params.id;
    const application = await db
      .collection("applications")
      .findOne({ _id: new ObjectId(applicationId), userId: req.user.userId });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching application" });
  }
};

// Update application
const updateApplication = async (req, res) => {
  try {
    const db = getDB();
    const applicationId = req.params.id;
    const { _id, userId, createdAt, ...updateData } = req.body;

    const result = await db.collection("applications").updateOne(
      {
        _id: new ObjectId(applicationId),
        userId: req.user.userId,
      },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
    );

    if (!result.matchedCount) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({
      success: true,
      message: "Application updated successfully",
    });
  } catch (error) {
    console.error("Update application error:", error);
    res.status(500).json({ message: "Error updating application" });
  }
};

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

module.exports = {
  addApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
