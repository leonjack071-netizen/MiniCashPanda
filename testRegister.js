const axios = require("axios");

const testRegister = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/register",
      {
        telegramId: "123456789",
        username: "LeonJack",
        referralCode: "",
      }
    );

    console.log(response.data);
  } catch (error) {
    console.log("Error:", error.response?.data || error.message);
  }
};

testRegister();
