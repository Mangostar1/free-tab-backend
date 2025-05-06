const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//*Models
const Tabs = require("../../models/Tabs.js");

//*Util
const userSession = require("../../session/sessionService.js");

router.post("/tab/new-tab", async (req, res) => {
  try {
    const { userName, bandName, songName, guitarArticle, bassArticle } = req.body;

    let postDate = new Date().toISOString().slice(0, 19).replace("T", " "); //* Fecha en la que se envía el post

    let secondGuitar = null; //* No se recibe una segunda guitarra por ahora | Eventualmente esta funcionalidad estara

    let bassArticleId = null;
    let guitarArticleId = null;
    let secondGuitarId = null;

    const MAX_TABS_PER_USER = 5;

    const tabsPerUser = await Tabs.countTabsByUser(userSession.getUserID());

    if (tabsPerUser >= MAX_TABS_PER_USER) {
      
      /* middleware */
      if (bassArticle) {
        await Tabs.insertBassTab(JSON.stringify(bassArticle), userSession.getUserID());
      }
      
      bassArticleId = await Tabs.getLastBassTabByUserId(userSession.getUserID());
  
  
      if (guitarArticle) {
        await Tabs.insertGuitarTab(JSON.stringify(guitarArticle), userSession.getUserID());
      }
  
      guitarArticleId = await Tabs.getLastGuitarTabByUserId(userSession.getUserID());
  
      await Tabs.setTab(
        bandName,
        songName,
        userSession.getUserID(),
        bassArticleId ? bassArticleId.bass_tab_id : null,
        guitarArticleId ? guitarArticleId.guitar_tab_id : null,
        secondGuitarId,
        postDate
      );
  
      res.status(201).json({ message: "Usuario creado con éxito la tablatura" });

    } else {
      res.status(400).json({ message: `Has alcanzado el máximo de ${MAX_TABS_PER_USER} notas.` })
    }

    
  } catch (e) {
    console.log("Error adding document: ", e);
    res.status(400).json({ message: e });
  }
});

module.exports = router;
