const User = require("../models/User");

const resetBonus = async (req, res) => {
  try {
    const { telegramId } = req.body;

    const user = await User.findOne({ telegramId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.channelJoinBonusClaimed = false;
    user.groupJoinBonusClaimed = false;

    if ("dailyBonusClaimed" in user) {
      user.dailyBonusClaimed = false;
    }

    await user.save();

    return res.json({
      success: true,
      message: "Developer reset completed.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  resetBonus,
};
