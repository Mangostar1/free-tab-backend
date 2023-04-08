const express = require('express');
const router = express.Router();

const dotenv = require('dotenv')
dotenv.config();


router.post('api/new-tab', (res, req) => {
    
    const {username, instrument, tab} = req.body;
    
})

module.exports = router;