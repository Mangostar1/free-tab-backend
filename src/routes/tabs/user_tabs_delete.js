const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//*Util
const userSession = require("../../session/sessionService.js");

//*Models
const Tabs = require("../../models/Tabs.js");

router.delete("/tab/user-tab-delete", (req, res) => {
  try {
    const {tabID} = req.body;

    Tabs.deleteTabById(tabID, userSession.getUserID());

    return res.status(201).json({ message: 'Tab eliminada con exito' });
  } catch (error) {
    console.log("Error deleting document: ", error);
    res.status(400).json({ message: error });
  }
});

module.exports = router;
