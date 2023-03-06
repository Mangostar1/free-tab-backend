const express = require('express');
const router = express.Router();

const dotenv = require('dotenv')
dotenv.config();

//*firebase
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");

const firebaseConfig = {

    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId

};

const app = initializeApp(firebaseConfig);
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