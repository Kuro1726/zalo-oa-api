const axios = require("axios");
const qs = require("qs");
const crypto = require("crypto");

const cfg = require("../core/config");
const store = require("../core/store");

const buildZaloAuthLink = (tenantID) => {
  const {appId, redirectUri} = cfg();  
  const redirect_uri = encodeURIComponent(redirectUri);  // Tại sao lại phải encode 
  const authLink = `https://oauth.zaloapp.com/v4/oa/permission?app_id=${appId}&redirect_uri=${redirect_uri}&state=${tenantID}`; //Link này đúng chưa
  return authLink;
}

const handleZaloAuthCallback = async (req, res) => {
  try {
    const {code, state} = req.query;
    const {appId, appSecret} = cfg();
    if (!appId || !appSecret) {
      console.warn ("NEED_ADMIN: Chưa có APP_ID, APP_SECRET");
      return res.status(400).json({error: "Chưa cấu hình APP_ID, APP_SECRET"});
    }

    const body = qs.stringify({
      app_id: appId,
      app_secret: appSecret,
      grant_type: "authorization_code",
      code: code
    });

    const r = await axios.post("https://oauth.zaloapp.com/v4/oa/access_token", body, {
      headers: {
        "secret_key": appSecret,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    const {access_token, refresh_token, token_expires_at} = r.data || {};
    store.channels.zalo = {
      mode: "live",
      access_token,
      refresh_token,
      token_expires_at: new Date(Date.now() + (token_expires_at-600) * 1000) // trừ 10' // nhưng mà vì sao nây là sử dụng token_expires_at-600
    }

    console.log ("ZALO CONNECTED for tenant: ", state);
    res.send ("Đã kết nối Zalo OA thành công. Bạn có thể đóng tab này.")
  }
  catch (e) {
    console.error(e?.response?.data || e.message);
    res.status(500).send("OAuth lỗi. Kiểm tra APP ID/Secret & redirect_uri.");
  }
}

module.exports = {
  buildZaloAuthLink,
  handleZaloAuthCallback
}