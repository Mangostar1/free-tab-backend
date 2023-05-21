const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

router.post("api/new-tab", (res, req) => {
  const { username, instrument, tab } = req.body;

  //En desarrollo
});

module.exports = router;
