const express = require('express');
const app = express();

const dotenv = require('dotenv')
dotenv.config();
const colors = require('colors');

const PORT = process.env.PORT || 3000;

app.use('/', require('./routes/apiRoutes'));

app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + './public/404.html');
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`.bgGreen);
})