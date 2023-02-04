const express = require('express');
const router = express.Router();

const dotenv = require('dotenv')
dotenv.config();
const mysql = require('mysql');

const credentials = {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
}

router.get('/tab', (req, res) => {
    res.send('En esta ruta se mostraran las tablaturas que los usuarios tengan guardadas en su perfil');
})

module.exports = router;