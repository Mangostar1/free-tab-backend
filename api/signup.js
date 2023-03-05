const express = require('express');
const router = express.Router();

const dotenv = require('dotenv')
dotenv.config();

//*firebase
const { firebaseConfig } = require('../config/firebaseConfig.js');
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

router.post('/api/signup', (req, res) => {
    
    const {username, email, password} = req.body;//?<-- Es posible que el parametro {username} no sea necesario para registrar a los nuevos usuarios

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);//!<-- test
        })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
})

module.exports = router;