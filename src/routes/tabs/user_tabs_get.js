import express from "express";
const router = express.Router();

import dotenv from "dotenv";
dotenv.config();

//*Models
import { Tabs } from "../../models/Tabs.js";

//*Util
import { getUserID } from "../../session/sessionService.js";

router.get("/api/user-tab", async (req, res) => {
  try {
    let tabData = await Tabs.getAllUserTabs(getUserID());

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

export default router;