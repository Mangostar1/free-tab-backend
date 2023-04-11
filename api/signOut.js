const express = require('express');
const router = express.Router();

const dotenv = require('dotenv')
dotenv.config();

//*firebase
const app = require('../config/firebaseConfig.js');
const { getAuth } = require("firebase/auth");

const auth = getAuth(app);

router.get('/api/logout', (req, res) => {
    auth.signOut()
    .then(() => {
        res.status(200).json({success: "Sesión cerrada"});
    })
    .catch((err) => {
        res.status(500).json({error: "Error al cerrar sesión"});
        console.log(err);
    })

})


module.exports = router;