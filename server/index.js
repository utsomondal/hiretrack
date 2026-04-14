require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");

const authRoutes = require("./routes/auth");
const applicationRoutes = require("./routes/applicationRoutes.js");

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.json({ message: "HireTrack API is running" });
});

async function startServer() {
  try {
    await connectDB();

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  } catch (err) {
    console.log("Failed to start", err);
  }
}

startServer();
