const express = require('express');
const app = express();

const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const colors = require('colors');

app.use(cors({ origin: true, credentials: true  }));

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use('/', require('./routes/apiGuide'));//<-- guide
app.use('/', require('./api/login'));//<-- login
app.use('/', require('./api/signup'));//<-- signup
app.use('/', require('./routes/users'));//<-- users
app.use('/', require('./routes/tabsDBQuery'));//<-- tabs

app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/public/404.html');
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`.bgGreen);

    if (PORT === 3000 || PORT === 5001) {//<-- For local
        console.log('http://127.0.0.1:3000/'.red)
    }
})