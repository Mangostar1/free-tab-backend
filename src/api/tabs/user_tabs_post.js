const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//*Models
const Tabs = require("../../models/Tabs.js");

//*Util
const userSession = require("../../session/sessionService.js");

router.post("/api/new-tab", async (req, res) => {
  try {
    const { userName, bandName, songName, guitarArticle, bassArticle } =
      req.body;

    console.log(bandName, songName, guitarArticle, bassArticle);

    let postDate = new Date().toLocaleString(); //* Fecha en la que se envia el post

    let secondGuitar = "null"; //* No se recibe una seguida guitarra por ahora

    Tabs.setTab(
      bandName,
      songName,
      userSession.getUserID(),
      bassArticle,
      guitarArticle,
      secondGuitar,
      postDate,
      (err, result) => {
        if (err) {
          console.error("Error al crear la tablatura:", err);
          res.status(500).json({ message: "Error en el servidor" });
        } else {
          res
            .status(201)
            .json({ message: "Usuario creado con éxito la tablatura" });
        }
      }
    );
  } catch (e) {
    console.log("Error adding document: ", e);
    res.status(400).json({ message: e });
  }
});

module.exports = router;
