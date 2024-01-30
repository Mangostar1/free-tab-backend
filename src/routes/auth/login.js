const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require('bcrypt');

//*Models
const User = require('../../models/Users.js');

//*Util
const userSession = require('../../session/sessionService.js');

router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Se deben proporcionar ambos campos." });
    }

    let user;
    try {
      user = await User.findUserByEmail(email);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error al buscar el usuario." });
    }

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    
    //Se establece la id del usuario de forma temporal.
    userSession.setUserID(user.id);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    const payload = { email: email };
    const secretKey = process.env.JWT_SECRET_KEY;
    const options = { expiresIn: "1h" };
    
    const token = jwt.sign(payload, secretKey, options);

    // Configura la cookie
    res.cookie("jwtToken", token, {
      secure: true,
      httpOnly: true,
      sameSite: "None",
    });

    res
      .status(200)
      .json({ token, message: "Usuario ha ingresado exitosamente." });
    console.log("Usuario ha ingresado exitosamente.");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ha ocurrido un error al iniciar sesión." });
  }
});

module.exports = router;