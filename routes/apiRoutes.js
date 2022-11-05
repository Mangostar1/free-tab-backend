const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('hola desde api home');
})

router.get('/api', (req, res) => {
    res.send('hola desde api');
})


module.exports = router;