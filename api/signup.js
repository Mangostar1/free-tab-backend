const express = require('express');
const router = express.Router();

const dotenv = require('dotenv')
dotenv.config();

//*firebase
const app = require('../config/firebaseConfig.js');
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");

const auth = getAuth(app);

router.post('/api/signup', (req, res) => {
    
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Se deben proporcionar ambos campos.' });
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            res.status(200).json({ message: 'Usuario creado exitosamente.' });
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            res.status(500).json({ message: 'Ha ocurrido un error al crear el usuario.' });
        });
})


module.exports = router;