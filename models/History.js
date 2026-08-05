const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    telegramId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "Watch Ad",
        "Daily Bonus",
        "Channel Bonus",
        "Group Bonus",
        "Withdraw",
      ],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Success", "Pending", "Rejected"],
      default: "Success",
    },
    message: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("History", historySchema);
