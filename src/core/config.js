export const cfg = () => ({
  appId: process.env.ZALO_APP_ID || "",
  appSecret: process.env.ZALO_APP_SECRET || "",
  redirectUri: process.env.ZALO_OAUTH_REDIRECT_URI,
  sigHeader: process.env.ZALO_SIGNATURE_HEADER || "X-ZSignature"
});