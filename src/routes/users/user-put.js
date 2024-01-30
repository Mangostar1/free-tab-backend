import express from "express";
const router = express.Router();

import dotenv from "dotenv";
dotenv.config();

//*Models
import { Users } from "../../models/Users.js";

//*Util
import { getUserID } from "../../session/sessionService.js";

// Ruta protegida para cambiar los datos del usuario
router.put("/user-data-update", async (req, res) => {
  try {
    const { userName, userImage } = req.body;
    
    if (userName) {
      await Users.updateUserName(getUserID(), userName, async(err, rows) => {
        if (err) {
          console.error("Error actualizando el nombre:", err);
          res.json({err});
        } else {
          const userId = getUserID();

          await Users.getUserById(userId, (err, user) => {
            if (err) {
              console.error("Error obteniendo los datos actualizados del usuario:", err);
              res.json({err});
            } else {
              console.log("Datos actualizados del usuario:", user);
              res.json(user.name)
            }
          })
        }
      })
    }

    if (userImage) {
      //code
    }
  } catch (error) {
    console.error("Error en /user-data-update:", error);
    res.status(500).json({ message: "Error interno del servidor", error });
  }
});

export default router;
