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
    const { userName, userImage, userFacebook, userTwitter, userInstagram, userDescription } = req.body;//<-- destructuracion
    const updates = {};
    
    if (userName) {
      await User.updateUserName(userSession.getUserID(), userName, async(err, rows) => {//<-- Se realiza la consulta

        if (err) {
          console.error("Error actualizando el nombre:", err);
        }

        if (rows.affectedRows === 1) {//<-- Si se afecto una fila, devuelve al cliente el nuevo nombre ingresado

          updates.user_name = userName;

        }

      })

    }

    if (userFacebook) {
      await User.updateUserFacebook(userSession.getUserID(), userFacebook, async(err, rows) => {//<-- Se realiza la consulta

        if (err) {
          console.error("Error actualizando el Facebook:", err);
        }

        if (rows.affectedRows === 1) {//<-- Si se afecto una fila, devuelve al cliente el nuevo nombre ingresado

          updates.user_facebook = userFacebook;

        }

      })
    }

    if (userTwitter) {
      await User.updateUserTwitter(userSession.getUserID(), userTwitter, async(err, rows) => {//<-- Se realiza la consulta

        if (err) {
          console.error("Error actualizando el Twitter / X:", err);
        }

        if (rows.affectedRows === 1) {//<-- Si se afecto una fila, devuelve al cliente el nuevo nombre ingresado

          updates.user_twitter = userTwitter;

        }

      })
    }

    if (userInstagram) {
      await User.updateUserInstagram(userSession.getUserID(), userInstagram, async(err, rows) => {//<-- Se realiza la consulta

        if (err) {
          console.error("Error actualizando el Instagram:", err);
        }

        if (rows.affectedRows === 1) {//<-- Si se afecto una fila, devuelve al cliente el nuevo nombre ingresado

          updates.user_instagram = userInstagram;

        }

      })
    }

    if (userDescription) {
      await User.updateUserDescription(userSession.getUserID(), userDescription, async(err, rows) => {//<-- Se realiza la consulta

        if (err) {
          console.error("Error actualizando la descripcion:", err);
        }

        if (rows.affectedRows === 1) {//<-- Si se afecto una fila, devuelve al cliente el nuevo nombre ingresado

          updates.user_description = userDescription;

        }

      })
    }

    if (userImage) {
      //code
    }

    return res.status(200).json(updates);//<-- Respuesta al cliente

  } catch (error) {

    console.error("Error en /user-data-update:", error);
    return res.status(500).json({ message: "Error interno del servidor", error });
    
  }
});

module.exports = router;
