const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

//firebase
const app = require("../../config/firebaseConfig.js");
const { getAuth, onAuthStateChanged } = require("firebase/auth");

const auth = getAuth(app);

// Ruta protegida para obtener los datos del usuario
router.get("/user-data", (req, res) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user; // Obtener el uid y el email del usuario
        res.json({ email, displayName, photoURL });
      } else {
        res.status(401).json({ message: "Usuario no autenticado" });
      }
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
