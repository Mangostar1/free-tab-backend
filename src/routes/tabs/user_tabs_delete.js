const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//*Models
const Tabs = require("../../models/Tabs.js");

router.delete("/tab/user-tab-delete", (req, res) => {

  const {tabID, userID} = req.body;

  Tabs.deleteTabById(tabID, userID);

  return res.status(201).json({ message: 'Tab eliminada con exito' });
});

module.exports = router;
