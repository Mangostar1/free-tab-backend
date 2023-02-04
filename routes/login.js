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

router.post('/api/login', (req, res) => {
    let connection = mysql.createConnection(credentials);
    
    //Se desestructuran los valores username y password del cuerpo de la peticion post enviada desde el front-end.
    const {username, password} = req.body;

    //Se asignan las variables username y password a value en forma de array para usarlos luegos en la consulta SQL.
    const values = [username, password];

    connection.query('SELECT * FROM user WHERE username = ? AND password = ?', values , (err, result) => {
        if (err) {
            res.status(500).send(err)//<-- Si ocurre un error durante la consulta, devuelve "Internal Server Error".
        } else {
            if (result.length > 0) {
                res.status(200).send(result[0]);//<-- Si se encuentra el usuario y contraseña en la base de datos devuelve un codigo de estado 200 (ok).
            } else {
                res.status(400).send('El usuario no existe');//<-- Si no se encuentra el usuario o la contraseña, se devuelve un codigo de estado 400 (Bad Request).
            }
        }
    });

    connection.end();
})


module.exports = router;