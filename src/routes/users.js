const express = require('express');
const router = express.Router();
const dotenv = require('dotenv')
dotenv.config();


router.get('/user', (req, res) => {
    res.send('aca se vera la lista de usuarios creados en el backend');
})

module.exports = router;