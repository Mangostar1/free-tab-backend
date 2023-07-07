const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

router.get("/api/tab-update", (req, res) => {
  res.send("Aca se veran las tabs creadas");
});

module.exports = router;
