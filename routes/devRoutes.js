const express = require("express");
const router = express.Router();

const {
  resetBonus,
} = require("../controllers/devController");

router.post("/dev/reset-bonus", resetBonus);

module.exports = router;
