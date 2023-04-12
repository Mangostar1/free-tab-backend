const express = require('express');
const router = express.Router();

const dotenv = require('dotenv')
dotenv.config();

//*firebase
const app = require('../config/firebaseConfig.js');
const { getAuth, signInWithEmailAndPassword  } = require("firebase/auth");

const auth = getAuth(app);

router.post('/api/login', (req, res) => {
    
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Se deben proporcionar ambos campos.' });
    }

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        res.status(200).json({ message: 'Usuario a ingresado exitosamente.' });
        const user = userCredential.user;
        console.log(user);
    })
    .catch((error) => {
        res.status(500).json({ message: 'Ha ocurrido un error al iniciar sesion.' });
    });
})


module.exports = router;