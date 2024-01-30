import express from "express";
const router = express.Router();

import dotenv from "dotenv";
dotenv.config();

//*Util
import { setUserID, getUserID } from "../../session/sessionService.js";

router.get("/api/logout", (req, res) => {

  try {
    const clear = null;
  
    setUserID(clear);

    console.log("Logout ", getUserID());

    res.status(200).json({ success: "Sesión cerrada" });
  } catch (error) {
    res.status(500).json({ error: "Error al cerrar sesión" });
    console.log(error);
  }

});

export default router;
