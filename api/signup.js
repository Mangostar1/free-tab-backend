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

router.post('/api/signup', (req, res) => {
    let connection = mysql.createConnection(credentials);
    
    const {username, email, password} = req.body;

    const values = [username, email, password];

    connection.query(`insert into user (username, email, password) value ('?', '?', '?')`, values, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            
        }
    })

    connection.end();
})

module.exports = router;