const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const watchAdRoutes = require("./routes/watchAdRoutes");
const dailyBonusRoutes = require("./routes/dailyBonusRoutes");
const channelBonusRoutes = require("./routes/channelBonusRoutes");
const groupBonusRoutes = require("./routes/groupBonusRoutes");
const withdrawRoutes = require("./routes/withdrawRoutes");
const historyRoutes = require("./routes/historyRoutes");
const telegramRoutes = require("./routes/telegramRoutes");
const devRoutes = require("./routes/devRoutes");
require("./bot");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

// API Routes
app.use("/api", userRoutes);
app.use("/api", watchAdRoutes);
app.use("/api", dailyBonusRoutes);
app.use("/api", channelBonusRoutes);
app.use("/api", groupBonusRoutes);
app.use("/api", withdrawRoutes);
app.use("/api", historyRoutes);
app.use("/api", telegramRoutes);
app.use("/api", devRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

/******** FRONTEND PAGES ********/

// Redirect root URL to Home Page
app.get("/", (req, res) => {
  res.redirect("/home");
});

// Home Page
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/home/index.html"));
});

// Profile Page
app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/profile/index.html"));
});

// Watch Ads Page
app.get("/watchads", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/watchads/index.html"));
});

// Withdraw Page
app.get("/withdraw", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/withdraw/index.html"));
});

// History Page
app.get("/history", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/history/index.html"));
});

/******** SERVER START ********/

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
