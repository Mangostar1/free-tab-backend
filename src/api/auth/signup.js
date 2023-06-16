const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//*firebase
const app = require("../../config/firebaseConfig.js");
const {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} = require("firebase/auth");

const auth = getAuth(app);

router.post("/api/signup", (req, res) => {
  const { email, password, userName } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Se deben proporcionar ambos campos." });
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      //Add user name
      updateProfile(auth.currentUser, {
        displayName: `${userName}`,
      });

      //then send verification to user email
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
      let errorMessage = "Ha ocurrido un error al crear el usuario.";

      if (error.code === "auth/invalid-email") {
        errorMessage = "El correo electrónico proporcionado es inválido.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage =
          "El correo electrónico proporcionado no está registrado.";
      }

      res.status(400).json({ message: errorMessage });
    });
});

module.exports = router;
