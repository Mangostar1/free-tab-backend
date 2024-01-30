const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//*Models
const Tabs = require("../../models/Tabs.js");

//*Util
const userSession = require("../../session/sessionService.js");

router.get("/api/user-tab", async (req, res) => {
  try {
    let tabData = await Tabs.getAllUserTabs(userSession.getUserID());

    if (tabData === null) {
      return res.status(404).json({ error: "No tabs found for this user" });
    }

    res.status(200).json(tabData);
    console.log('Se obtiene tablatura: /api/user-tab');
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
