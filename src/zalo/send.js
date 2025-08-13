const axios = require("axios");
const qs = require("qs");
const store = require("../core/store");

const sendTextMock = async ({ userID, text }) => {
  // Nếu đã live -> Gọi API thật
  const ch = store.channels.zalo;
  if (ch.mode === "live" && ch.access_token) {
    const r = await axios.post(
      `https://openapi.zalo.me/v2.0/oa/message`,
      { recipient: { user_id: userID }, message: { text: text } },
      {
        headers: {
          access_token: ch.access_token,
          "Content-Type": "application/json",
        },
      }
    );
    return { mode: "live", provider: r.data };
  }
  // Mock mode
  return { mode: "mock", echo: { user_id: userID, text: text } }; 
}

module.exports = sendTextMock