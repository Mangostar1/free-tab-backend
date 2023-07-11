const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//firebase
const { getFirestore, addDoc, collection } = require("firebase/firestore");
const app = require("../../config/firebaseConfig.js");
const db = getFirestore(app);

router.post("/api/new-tab", async (req, res) => {
  try {
    const { userName, bandName, songName, guitarArticle, bassArticle } =
      req.body;
    const docRef = await addDoc(collection(db, "users-tabs"), {
      user: userName,
      band: bandName,
      song: songName,
      bassTab: bassArticle || "empty",
      guitarTab: guitarArticle || "empty",
    });

    console.log("Document written with ID: ", docRef.id);
    res.status(201).json({
      message: "Document saved successfully.",
      id: docRef.id,
    });
  } catch (e) {
    console.log("Error adding document: ", e);
  }
});

module.exports = router;
