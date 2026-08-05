const express = require("express");
const router = express.Router();

const {
  registerUser,
  getUser,
} = require("../controllers/userController");

// Register User
router.post("/register", registerUser);

// Get User Information
router.post("/get-user", getUser);

module.exports = router;
