const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

//firebase
const app = require("../../config/firebaseConfig.js");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

const auth = getAuth(app);

router.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Se deben proporcionar ambos campos." });
  }

  console.log(email);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Verificar si el correo del usuario está verificado
      if (user.emailVerified) {
        // Genera el JWT
        const payload = { email: user.email };
        const secretKey = process.env.JWT_SECRET_KEY; // Usa tu clave secreta de JWT almacenada en las variables de entorno
        const options = { expiresIn: "1h" }; // Opciones del token, como el tiempo de expiración

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
      } else {
        res.status(401).json({
          message: "El correo electrónico del usuario no está verificado.",
        });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Ha ocurrido un error al iniciar sesión." });
    });
});

module.exports = router;
