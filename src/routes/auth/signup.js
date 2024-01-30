import express from "express";
const router = express.Router();
import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";

//*Models
import Users from "../../models/Users.js";

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

    
    if (Users.findUserByEmail(email)) {
      res.json({message: 'El email ya se encuentra en uso'});
      console.log('El email ya se encuentra en uso');
    }

    const contraseñaEncriptada = await bcrypt.hash(password, salt);

    const dateCreated = new Date().toISOString().slice(0, 19).replace("T", " ");

    Users.createUser(userName, email, contraseñaEncriptada, dateCreated, (err, result) => {
      if (err) {
        console.log('Error al crear usuario:', err);
        res.status(500).json({ message: 'Error en el servidor' });
      } else {
        res.json({ message: 'Usuario creado con éxito' });
        console.log('Usuario creado con éxito');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

export default router;