const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const History = require("../models/History");
const registerUser = async (req, res) => {
  try {
    const { telegramId, username, referralCode } = req.body;

console.log("========== REGISTER ==========");
console.log("telegramId:", telegramId);
console.log("username:", username);
console.log("referralCode:", referralCode);

    // User আগে থেকে আছে কিনা চেক
    let user = await User.findOne({ telegramId });

if (user) {

  user.username = username;

  await user.save();

console.log("User saved successfully");

  return res.status(200).json({
    success: true,
    message: "User already registered.",
    user,
  });

}

    // নতুন Referral Code তৈরি
    const newReferralCode =
      "MCP" + uuidv4().replace(/-/g, "").substring(0, 6).toUpperCase();

    // নতুন User তৈরি
    user = new User({
      telegramId,
      username,
      balance: 20,
      totalEarnings: 20,
      referralCode: newReferralCode,
      referredBy: referralCode || "",
      newUserBonusClaimed: true,
    });

    // Give referral bonus if referral code is valid
    if (referralCode) {
      const referrer = await User.findOne({
        referralCode: referralCode,
      });

      // Prevent self-referral
      if (referrer && referrer.telegramId !== telegramId) {
        referrer.balance += 10;
        referrer.totalEarnings += 10;
        referrer.totalReferrals += 1;

await History.create({
  telegramId: referrer.telegramId,
  type: "Referral Bonus",
  amount: 10,
  status: "Success",
  message: "Referral bonus received",
});

        await referrer.save();
      }
    }

    await user.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { telegramId } = req.body;

    const user = await User.findOne({ telegramId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

const today = new Date().toISOString().split("T")[0];

if (user.adsTodayDate !== today) {
  user.adsTodayDate = today;
  user.adsToday = 0;
  await user.save();
}

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

const getReferrals = async (req, res) => {
  try {
    const { telegramId } = req.body;

    const user = await User.findOne({ telegramId });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    const referrals = await User.find({
      referredBy: user.referralCode
    }).select("telegramId username");

    return res.json({
      success: true,
      totalReferrals: referrals.length,
      referrals
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

module.exports = {
  registerUser,
  getUser,
};

module.exports = {
  registerUser,
  getUser,
  getReferrals,
};

