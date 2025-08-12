const express = require("express");
const app = express();
const dotenv = require("dotenv");
const axios = require("axios");
const qs = require("qs");
const router = require("router");
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

dotenv.config();
app.use(router);

const port = process.env.APP_PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
