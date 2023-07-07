const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//firebase
const { getFirestore } = require("firebase/firestore");
const app = require("../../config/firebaseConfig.js");
const db = getFirestore(app);

router.post("/api/new-tab", async (req, res) => {
  try {
    const { userName, bandName, songnName, guitar, bass, guitarTab, bassTab } =
      req.body;
    const docRef = await addDoc(collection(db, "users-tabs"), {
      user: userName,
      band: bandName,
      song: songnName,
      guitar: guitar || "empty",
      bass: bass || "empty",
      guitarTab: guitarTab || "empty",
      bassTab: bassTab || "empty",
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.log("Error adding document: ", e);
  }
});

module.exports = router;
