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
    
    //Some query

    connection.end();
})

module.exports = router;