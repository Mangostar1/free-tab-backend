const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

//*Models
const User = require("../../models/Users.js");

//*Util
const userSession = require("../../session/sessionService.js");

// Ruta protegida para cambiar los datos del usuario
router.put("/user-data-update", async (req, res) => {
  try {
    const { userName, userImage } = req.body;
    
    if (userName) {
      await User.updateUserName(userSession.getUserID(), userName, async(err, rows) => {

        if (err) {
          console.error("Error actualizando el nombre:", err);
          return res.status(500).json({ message: "Error actualizando el nombre:", err });
        }

        const userId = userSession.getUserID();

        if (rows.affectedRows === 1) {

          const userData = await User.getUserById(userId);

          const displayName = userData.user_name;

          console.log("Datos actualizados del usuario:", userData.email);
          return res.status(200).json({ user_name: displayName });

        }

      })

    }

    if (userImage) {
      //code
    }

  } catch (error) {

    console.error("Error en /user-data-update:", error);
    return res.status(500).json({ message: "Error interno del servidor", error });
    
  }
});

module.exports = router;
