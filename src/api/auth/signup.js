const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require('bcrypt');

//*Models
const User = require('../../models/Users.js');

const saltRounds = process.env.SALT_ROUNDS;

router.post("/api/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(Number(saltRounds));
    const { email, password, userName } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Se deben proporcionar ambos campos." });
    }

    
    if (User.findUserByEmail(email)) {
      res.json({message: 'El email ya se encuentra en uso'});
    }

    const contraseñaEncriptada = await bcrypt.hash(password, salt);

    User.createUser(userName, email, contraseñaEncriptada, (err, result) => {
      if (err) {
        console.error('Error al crear usuario:', err);
        res.status(500).json({ message: 'Error en el servidor' });
      } else {
        res.json({ message: 'Usuario creado con éxito' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


module.exports = router;