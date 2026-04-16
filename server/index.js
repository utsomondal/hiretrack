require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");

const authRoutes = require("./routes/auth");
const applicationRoutes = require("./routes/applicationRoutes.js");

const app = express();

app.set("trust proxy", 1);

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.json({ message: "CareerLogr API is running" });
});

app.get("/health", (req, res) => {
  res.send("OK");
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
