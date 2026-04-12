const { getDB } = require("../config/db");

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

// Get applications for logged-in user
const getApplications = async (req, res) => {
  try {
    const db = getDB();

    const applications = await db
      .collection("applications")
      .find({ userId: req.user.id })
      .toArray();

    res.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications" });
  }
};

module.exports = { addApplication, getApplications };
