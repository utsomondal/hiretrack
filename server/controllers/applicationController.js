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

    if (!ObjectId.isValid(applicationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }
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

    if (!ObjectId.isValid(applicationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }
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

    if (!ObjectId.isValid(applicationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const result = await db.collection("applications").deleteOne({
      _id: new ObjectId(applicationId),
      userId: req.user.userId,
    });

    if (!result.deletedCount) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting application",
    });
  }
};

// Get application stats
const getApplicationStats = async (req, res) => {
  try {
    const db = getDB();
    const userId = req.user.userId;
    const stats = await db
      .collection("applications")
      .aggregate([
        {
          $match: { userId },
        },
        {
          $group: {
            _id: null,
            totalApplied: { $sum: 1 },
            inProgress: {
              $sum: {
                $cond: [{ $eq: ["$status", "Screening"] }, 1, 0],
              },
            },
            interviewed: {
              $sum: {
                $cond: [{ $eq: ["$status", "Interview"] }, 1, 0],
              },
            },
            offered: {
              $sum: {
                $cond: [{ $eq: ["$status", "Offer"] }, 1, 0],
              },
            },
          },
        },
      ])
      .toArray();
    const result = stats[0] || {
      totalApplied: 0,
      inProgress: 0,
      interviewed: 0,
      offered: 0,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get recent applications
const getRecentApplications = async (req, res) => {
  try {
    const db = getDB();
    const limit = Math.min(parseInt(req.query.limit) || 5, 20);
    const applications = await db
      .collection("applications")
      .find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .project({
        company: 1,
        role: 1,
        status: 1,
        createdAt: 1,
      })
      .toArray();

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error("Error fetching recent applications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch recent applications",
    });
  }
};

// Get job type
const getJobType = async (req, res) => {
  try {
    const db = getDB();
    const userId = req.user.userId;

    const remoteCount = await db
      .collection("applications")
      .countDocuments({ userId, isRemote: true });

    const onSiteCount = await db
      .collection("applications")
      .countDocuments({ userId, isRemote: false });

    return res.status(200).json({
      success: true,
      data: {
        Remote: remoteCount,
        Onsite: onSiteCount,
      },
    });
  } catch (error) {
    console.error("Remote stats error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get application timeline
const getApplicationTimeline = async (req, res) => {
  try {
    const db = getDB();
    const userId = req.user.userId;

    const result = await db
      .collection("applications")
      .aggregate([
        {
          $match: {
            userId: userId,
            dateApplied: {
              $exists: true,
              $type: "string",
            },
          },
        },

        // convert string -> date safely
        {
          $addFields: {
            safeDate: {
              $dateFromString: {
                dateString: "$dateApplied",
                onError: null,
                onNull: null,
              },
            },
          },
        },

        // remove invalid dates (VERY IMPORTANT)
        {
          $match: {
            safeDate: { $ne: null },
          },
        },

        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$safeDate",
              },
            },
            count: { $sum: 1 },
          },
        },

        {
          $sort: { _id: 1 },
        },
      ])
      .toArray();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Timeline Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch application timeline",
    });
  }
};

module.exports = {
  addApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  getApplicationStats,
  getRecentApplications,
  getJobType,
  getApplicationTimeline,
};
