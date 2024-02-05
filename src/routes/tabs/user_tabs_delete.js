const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

router.delete("/tab/user-tab-delete", (req, res) => {
  res.send("Aca se veran las tabs creadas");
});

module.exports = router;
