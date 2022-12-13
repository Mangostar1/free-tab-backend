const express = require('express');
const router = express.Router();

const dotenv = require('dotenv')
dotenv.config();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

connection.connect();//<-- Conecto a mysql

router.get('/', (req, res) => {
    res.send('hola desde api home');
})

router.get('/api', (req, res) => {
    res.send('hola desde api, aca muestro animales y usuarios');
})

router.get('/api/user', (req, res) => {

    connection.query('SELECT * FROM user', function (error, results, fields) {
        if (error) throw error;
        res.json(results);//<-- Responde un json con la tabla user de mysql
    });

})


module.exports = router;