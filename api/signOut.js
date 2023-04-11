const express = require('express');
const router = express.Router();

const dotenv = require('dotenv')
dotenv.config();

//*firebase
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");

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

router.get('/api/logout', (req, res) => {
    auth.signOut()
    .then(() => {
        res.status(200).send("Sesión cerrada");
    })
    .catch((error) => {
        res.status(500).send("Error al cerrar sesión", error);
    })

})


module.exports = router;