const express = require("express");
const router = express.Router();
const buildZaloAuthLink = require("./zalo/oauth");
const handleZaloAuthCallback = require("./zalo/oauth");
const zaloWebhook = require("./zalo/webhook");
const sendTextMock = require("./zalo/send");

// Trả về link Oauth để admin OA bấm
router.get("/integrations/zalo/oauth-link", (req, res) => {
  const tenantID = "TENANT_ID"; //sau này lấy từ auth/DB
  res.json({ url: buildZaloAuthLink(tenantID) });
});

// Oauth Callback (khi Admin OA bấm đồng ý)
router.get("/zalo/oauth/callback", handleZaloAuthCallback);

// Webhook nhận tin nhắn từ zalo
router.post("/webhooks/zalo", zaloWebhook);

// API gửi tin (tạm mock khi chưa có token thật)
router.post("/api/threads/:id/messages", async (req, res) => {
  // TODO: lấy thread/contact từ DB; giờ mock cứng
  const userID = "USER_ID";
  const {text} = req.body || {text: ""};
  const result = await sendTextMock({userID, text});
  res.json(result);
});

module.exports = router;