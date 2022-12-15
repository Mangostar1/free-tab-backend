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

router.get('/', (req, res) => {
    res.send('hola desde api home');
})

router.get('/api', (req, res) => {
    res.send('hola desde api, aca muestros usuarios');
})

router.get('/api/user', (req, res) => {
    let connection = mysql.createConnection(credentials);

    connection.query('SELECT * FROM user', function (error, results, fields) {
        if (error) throw error;
        res.json(results);//<-- Responde un json con la tabla user de mysql
    });

    connection.end();
})

router.post('/api/login', (req, res) => {
    const {username, password} = req.body;
    const values = [username, password];
})


module.exports = router;