const express = require("express");
const router = express.Router();

const {
  resetBonus,
  deleteUser,
} = require("../controllers/devController");

router.post("/dev/reset-bonus", resetBonus);
router.post("/dev/delete-user", deleteUser);

module.exports = router;
