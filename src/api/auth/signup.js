const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require('bcrypt');

//*Models
const User = require('../../models/Users.js');

const saltRounds = process.env.SALT_ROUNDS;

router.post("/api/signup", (req, res) => {
  try {
   // const salt = bcrypt.genSalt(saltRounds);
    const { email, password, userName } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Se deben proporcionar ambos campos." });
    }

    //const contraseñaEncriptada = bcrypt.hash(password, salt);

    User.createUser(userName, email, password, (err, result) => {
      if (err) {
        console.error('Error al crear usuario:', err);
        res.status(500).json({ message: 'Error en el servidor' });
      } else {
        res.json({ message: 'Usuario creado con éxito' });
      }
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;

/* 
!Falta añadir un encriptador de contraseñas para no enviarla en texto plano
*/