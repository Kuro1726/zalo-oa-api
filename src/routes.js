const express = require("express");
const router = express.Router();
const oauth = require("./zalo/oauth");
const webhook = require("./zalo/webhook");
const send = require("./zalo/send");

// Trả về link Oauth để admin OA bấm
router.get("/integrations/zalo/oauth-link", (req, res) => {
  const tenantID = "TENANT_ID"; //sau này lấy từ auth/DB
  res.json({ url: oauth.buildZaloAuthLink(tenantID) });
});

// Oauth Callback (khi Admin OA bấm đồng ý)
router.get("/zalo/oauth/callback", oauth.handleZaloAuthCallback);

// Webhook nhận tin nhắn từ zalo
router.post("/webhooks/zalo", webhook);

// API gửi tin (tạm mock khi chưa có token thật)
router.post("/api/threads/:id/messages", async (req, res) => {
  // TODO: lấy thread/contact từ DB; giờ mock cứng
  const userID = "USER_ID";
  const {text} = req.body || {text: ""};
  const result = await send({userID, text});
  res.json(result);
});

module.exports = router;