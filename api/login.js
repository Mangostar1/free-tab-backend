const express = require('express');
const router = express.Router();

const dotenv = require('dotenv')
dotenv.config();

router.post('/api/login', (req, res) => {
    
    //Se desestructuran los valores username y password del cuerpo de la peticion post enviada desde el front-end.
    const {username, password} = req.body;
})


module.exports = router;