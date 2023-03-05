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

router.post('api/new-tab', (res, req) => {
    let connection = mysql.createConnection(credentials);

    connection.query();

    connection.end();
})

module.exports = router;