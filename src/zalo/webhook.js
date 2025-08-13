const axios = require("axios");
const qs = require("qs");
const cfg = require("../core/config");

const verifySignature = (req) => {
  const {sigHeader, appSecret} = cfg();
  const sig = req.header(sigHeader);
  const mac = crypto.createHmac("sha256", appSecret).update(req.rawBody).digest("hex");
  return sig === mac;
}


const zaloWebhook = async (req, res) => {
  // DEV: nếu chưa có secret thì cho phép skip verify (chỉ dev!)
  const ok = (cfg().appSecret) ? verifySignature(req) : true;
  if (!ok) return res.status(401).json({error: "Invalid signature"});

  //TODO: chuẩn hoá payload & lưu DB 
  console.log ("Webhook event: ", req.body);
  res.sendStatus(200);
}

module.exports = zaloWebhook