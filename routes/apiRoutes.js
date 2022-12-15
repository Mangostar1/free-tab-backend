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
    res.send(`Hola a mi api, las rutas que esta tiene son: <a href="/api/user">users</a>`);
})

router.get('/api', (req, res) => {
    res.send('Las rutas que entrega esta api son:');
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
    let connection = mysql.createConnection(credentials);

    const {username, password} = req.body;
    const values = [username, password];

    connection.query('SELECT * FROM user WHERE username = ? AND password = ?', values , (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if (result.length > 0) {
                res.status(200).send(result[0]);
            } else {
                res.status(400).send('El usuario no existe');
            }
        }
    });

    connection.end();
})


module.exports = router;