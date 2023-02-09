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
    let connection = mysql.createConnection(credentials);
    connection.query('SELECT * FROM tablature', function (error, results, fields) {
        if (error) throw error;
        res.json(results);//<-- Responde un json con la tabla user de mysql
    });
    connection.end();
})

module.exports = router;