const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

//firebase
const app = require("../../config/firebaseConfig.js");
const { getAuth, onAuthStateChanged, updateProfile } = require("firebase/auth");

const auth = getAuth(app);

// Ruta protegida para obtener los datos del usuario
router.put("/user-data-update", (req, res) => {
  try {
    const { userName, userImage } = req.body;
    updateProfile(auth.currentUser, {
      displayName: `${userName}`,
      photoURL: `${userImage}`,
    })
      .then(
        res.json({
          displayName: auth.currentUser.displayName,
          photoURL: auth.currentUser.photoURL,
        })
      )
      .catch((error) => {
        res.send({ message: error });
      });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
