const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//*firebase
const app = require("../config/firebaseConfig.js");
const {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} = require("firebase/auth");

const auth = getAuth(app);

router.post("/api/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Se deben proporcionar ambos campos." });
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      sendEmailVerification(auth.currentUser)
        .then(() => {
          res.status(200).json({
            message:
              "Usuario creado exitosamente. Se ha enviado un correo de verificación.",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message:
              "Ha ocurrido un error al enviar el correo de verificación.",
          });
        });
      console.log(user);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Ha ocurrido un error al crear el usuario." });
    });
});

module.exports = router;
