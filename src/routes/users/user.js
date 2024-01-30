import express from "express";
const router = express.Router();

import dotenv from "dotenv";
dotenv.config();

//*Models
import Users from "../../models/Users.js";

//*Util
import { getUserID } from "../../session/sessionService.js";

// Ruta protegida para obtener los datos del usuario
router.get("/user-data", async (req, res) => {
  try {
    const userId = getUserID();

    const userData = await Users.getUserById(userId);

    const displayName = userData.name;
    const email = userData.email;
    const photoURL = userData.img_profile;

    res.status(200).json({ email, displayName, photoURL });
    console.log('Se obtienen los datos del usuario: /user-data');
  } catch (error) {
    console.error("Error en /user-data:", error);
    res.status(400).json({
      message: "Ha ocurrido un error al obtener los datos del usuario.",
    });
  }
});

export default router;
