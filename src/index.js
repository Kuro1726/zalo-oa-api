const express = require("express");
const app = express();
const dotenv = require("dotenv");
const axios = require("axios");
const qs = require("qs");
const router = require("./routes");
const helmet = require("helmet");
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(helmet())
dotenv.config();
app.use(router);

app.get("/", (req, res) => res.send("Hello World!"));
const port = process.env.APP_PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
