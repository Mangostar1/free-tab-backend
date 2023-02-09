const express = require('express');
const router = express.Router();

const dotenv = require('dotenv')
dotenv.config();

router.get('/', (req, res) => {
    res.send(`Hola, esta es mi api, las rutas que esta tiene son:
        <li><a href="/api">APIs</a></li>
        <li><a href="https://github.com/Mangostar1/My-Backend-ExpressJS">Repositorio</a></li>`);
})

router.get('/api', (req, res) => {
    res.send('Las rutas que entrega esta api son:<li><a href="/user">Users</a></li><li><a href="/tab">Tabs</a></li>');
})

module.exports = router;