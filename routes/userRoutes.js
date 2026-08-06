const express = require("express");
const router = express.Router();

const {
  registerUser,
  getUser,
  getReferrals,
} = require("../controllers/userController");

// Register User
router.post("/register", registerUser);

// Get User Information
router.post("/get-user", getUser);

router.post("/get-referrals", getReferrals);

module.exports = router;
