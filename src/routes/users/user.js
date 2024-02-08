const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

//*Models
const User = require("../../models/Users.js");

//*Util
const userSession = require("../../session/sessionService.js");

// Ruta protegida para obtener los datos del usuario
router.get("/user-data", async (req, res) => {
  try {
    const userId = userSession.getUserID();

    const userData = await User.getUserById(userId);

    const displayName = userData.user_name;
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

module.exports = router;
