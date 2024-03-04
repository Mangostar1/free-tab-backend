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
    
    if (userName) {
      await User.updateUserName(userSession.getUserID(), userName, async(err, rows) => {//<-- Se realiza la consulta

        if (err) {
          console.error("Error actualizando el nombre:", err);
          return res.status(500).json({ message: "Error actualizando el nombre:", err });
        }

        const userId = userSession.getUserID();

        if (rows.affectedRows === 1) {//<-- Si se afecto una fila, devuelve al cliente el nuevo nombre ingresado

          const userData = await User.getUserById(userId);

          const displayName = userData.user_name;

          console.log("Datos actualizados del usuario:", userData.email);
          return res.status(200).json({ user_name: displayName });//<-- Respuesta al cliente

        }

      })

    }

    if (userFacebook) {
      await User.updateUserFacebook(userSession.getUserID(), userFacebook, async(err, rows) => {//<-- Se realiza la consulta

        if (err) {
          console.error("Error actualizando el Facebook:", err);
          return res.status(500).json({ message: "Error actualizando el Facebook:", err });
        }

        const userId = userSession.getUserID();

        if (rows.affectedRows === 1) {//<-- Si se afecto una fila, devuelve al cliente el nuevo nombre ingresado

          const userData = await User.getUserById(userId);

          const sm_facebook = userData.sm_facebook;

          console.log("Datos actualizados del usuario:", userData.email);
          return res.status(200).json({ user_facebook: sm_facebook });//<-- Respuesta al cliente

        }

      })
    }

    if (userTwitter) {
      await User.updateUserTwitter(userSession.getUserID(), userTwitter, async(err, rows) => {//<-- Se realiza la consulta

        if (err) {
          console.error("Error actualizando el Twitter / X:", err);
          return res.status(500).json({ message: "Error actualizando el Twitter / X:", err });
        }

        const userId = userSession.getUserID();

        if (rows.affectedRows === 1) {//<-- Si se afecto una fila, devuelve al cliente el nuevo nombre ingresado

          const userData = await User.getUserById(userId);

          const sm_twitter = userData.sm_twitter;

          console.log("Datos actualizados del usuario:", userData.email);
          return res.status(200).json({ user_twitter: sm_twitter });//<-- Respuesta al cliente

        }

      })
    }

    if (userInstagram) {
      await User.updateUserInstagram(userSession.getUserID(), userInstagram, async(err, rows) => {//<-- Se realiza la consulta

        if (err) {
          console.error("Error actualizando el Instagram:", err);
          return res.status(500).json({ message: "Error actualizando el Instagram:", err });
        }

        const userId = userSession.getUserID();

        if (rows.affectedRows === 1) {//<-- Si se afecto una fila, devuelve al cliente el nuevo nombre ingresado

          const userData = await User.getUserById(userId);

          const sm_instagram = userData.sm_instagram;

          console.log("Datos actualizados del usuario:", userData.email);
          return res.status(200).json({ user_instagram: sm_instagram });//<-- Respuesta al cliente

        }

      })
    }

    if (userDescription) {
      await User.updateUserDescription(userSession.getUserID(), userDescription, async(err, rows) => {//<-- Se realiza la consulta

        if (err) {
          console.error("Error actualizando la descripcion:", err);
          return res.status(500).json({ message: "Error actualizando la descripcion:", err });
        }

        const userId = userSession.getUserID();

        if (rows.affectedRows === 1) {//<-- Si se afecto una fila, devuelve al cliente el nuevo nombre ingresado

          const userData = await User.getUserById(userId);

          const user_description = userData.user_description;

          console.log("Datos actualizados del usuario:", userData.email);
          return res.status(200).json({ user_description: user_description });//<-- Respuesta al cliente

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
