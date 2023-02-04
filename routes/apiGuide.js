const express = require('express');
const router = express.Router();

const dotenv = require('dotenv')
dotenv.config();

router.get('/', (req, res) => {
    res.send(`Hola, esta es mi api, las rutas que esta tiene son: <a href="/api">APIs</a>`);
})

router.get('/api', (req, res) => {
    res.send('Las rutas que entrega esta api son: <a href="/user">Users</a> <br> <a href="/tab">Tabs</a>');
})

module.exports = router;