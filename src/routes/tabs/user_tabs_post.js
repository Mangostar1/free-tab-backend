import express from "express";
const router = express.Router();

import dotenv from "dotenv";
dotenv.config();

//*Models
import { Tabs } from "../../models/Tabs.js";

//*Util
import { getUserID } from "../../session/sessionService.js";

router.post("/api/new-tab", async (req, res) => {
  try {
    const { userName, bandName, songName, guitarArticle, bassArticle } = req.body;

    let postDate = new Date().toISOString().slice(0, 19).replace("T", " "); //* Fecha en la que se envía el post

    let secondGuitar = null; //* No se recibe una segunda guitarra por ahora | Eventualmente esta funcionalidad estara

    let bassArticleId = null;
    let guitarArticleId = null;
    let secondGuitarId = null;

    /* middleware */
    //code
    if (bassArticle) {
      Tabs.insertBassTab(JSON.stringify(bassArticle), getUserID());
      bassArticleId = await Tabs.getLastBassTabByUserId(getUserID());
    }

    if (guitarArticle) {
      Tabs.insertGuitarTab(JSON.stringify(guitarArticle), getUserID());
      guitarArticleId = await Tabs.getLastGuitarTabByUserId(getUserID());
    }

    Tabs.setTab(
      bandName,
      songName,
      getUserID(),
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
          console.log("Usuario creado con éxito la tablatura");
        }
      }
    );
  } catch (e) {
    console.log("Error adding document: ", e);
    res.status(400).json({ message: e });
  }
});

export default router;