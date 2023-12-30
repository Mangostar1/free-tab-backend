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
    const { userName, bandName, songName, guitarArticle, bassArticle } = req.body;

    let postDate = new Date().toISOString().slice(0, 19).replace("T", " "); //* Fecha en la que se envía el post

    let secondGuitar = null; //* No se recibe una segunda guitarra por ahora

    let bassArticleId = null;
    let guitarArticleId = null;
    let secondGuitarId = null;

    /* middleware */
    //code
    if (bassArticle) {
      Tabs.incertBassTab(JSON.stringify(bassArticle), userSession.getUserID());
      bassArticleId = await Tabs.getLastBassTabByUserId(userSession.getUserID());
    }
    
    if (guitarArticle) {
      //code
    }

    Tabs.setTab(
      bandName,
      songName,
      userSession.getUserID(),
      bassArticleId.bass_tab_id,
      guitarArticleId,
      secondGuitarId,
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
