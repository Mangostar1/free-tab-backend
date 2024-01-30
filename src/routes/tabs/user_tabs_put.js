import express from "express";
const router = express.Router();

import dotenv from "dotenv";
dotenv.config();

//*Models
import { Tabs } from "../../models/Tabs.js";

//*Util
import { getUserID } from "../../session/sessionService.js";

router.put("/api/user-tab/:id/update", (req, res) => {
  const id = req.params.id;
  res.send("Aca se veran las tabs creadas");
});

export default router;
