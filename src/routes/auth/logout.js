const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//*Util
const userSession = require('../../session/sessionService.js');

router.get("/auth/logout", (req, res) => {

  try {
    const clear = null;
  
    userSession.setUserID(clear);

    console.log("Logout ", userSession.getUserID());

    res.status(200).json({ success: "Sesión cerrada" });
  } catch (error) {
    res.status(500).json({ error: "Error al cerrar sesión" });
    console.log(error);
  }

});

module.exports = router;
