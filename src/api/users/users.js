const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = require("../../middleware/authMiddleware.js");

//firebase
const app = require("../../config/firebaseConfig.js");
const { getAuth, onAuthStateChanged } = require("firebase/auth");

const auth = getAuth(app);

// Middleware de autenticación
/* function isAuthenticated(req, res, next) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      req.user = user; // Almacenar el objeto de usuario en la solicitud
      next();
    } else {
      res.status(401).json({ message: "Usuario no autenticado" });
    }
  });
} */

// Ruta protegida para obtener los datos del usuario
router.get("/user-data", authMiddleware, (req, res) => {
  try {
    const user = req.user;
    const { email, displayName, photoURL } = user; // Obtener el uid y el email del usuario
    res.json({ email, displayName, photoURL });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
