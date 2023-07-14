const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//firebase
const { getFirestore, getDocs, collection } = require("firebase/firestore");
const app = require("../../config/firebaseConfig.js");
const db = getFirestore(app);

router.get("/api/user-tab", async (req, res) => {
  const querySnapshot = await getDocs(collection(db, "users-tabs"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
});

module.exports = router;
