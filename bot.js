const TelegramBot = require("node-telegram-bot-api").default;

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: {
    autoStart: false,
  },
});

(async () => {
  try {
    await bot.deleteWebHook();
    await bot.startPolling();
    console.log("Telegram Bot Started");
  } catch (err) {
    console.log("Bot Start Error:", err.message);
  }
})();

bot.onText(/\/start(?: (.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;

  const referralCode = match && match[1] ? match[1] : "";

const miniAppUrl =
  "https://minicashpanda.onrender.com/home" +
  (referralCode ? "?ref=" + referralCode : "");

  await bot.sendMessage(chatId, "🐼 Welcome to MiniCashPanda!", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🚀 Open MiniCashPanda",
            web_app: {
              url: miniAppUrl,
            },
          },
        ],
      ],
    },
  });
});

module.exports = bot;
