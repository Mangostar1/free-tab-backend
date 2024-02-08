const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require('bcrypt');

//*Models
const User = require('../../models/Users.js');

const saltRounds = process.env.SALT_ROUNDS;

router.post("/auth/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(Number(saltRounds));
    const { email, password, userName } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Se deben proporcionar ambos campos." });
    }

    const contraseñaEncriptada = await bcrypt.hash(password, salt);

    const dateCreated = new Date().toISOString().slice(0, 19).replace("T", " ");

    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya se encuentra en uso' });
    } else {
      User.createUser(userName, email, contraseñaEncriptada, dateCreated, (err, result) => {
        if (err) {
          console.log('Error al crear usuario:', err);
          return res.status(500).json({ message: 'Error en el servidor' });
        } else {
          return res.status(201).json({ message: 'Usuario creado con éxito' });
        }
      });
    }
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;