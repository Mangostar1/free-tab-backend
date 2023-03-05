const express = require('express');
const router = express.Router();

const dotenv = require('dotenv')
dotenv.config();

//*firebase
import { app } from '../config/firebaseConfig'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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