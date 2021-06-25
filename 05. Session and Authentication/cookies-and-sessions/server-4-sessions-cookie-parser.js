const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
    console.log(req.cookies);
    
    res.cookie('message', 'hello');
    res.send('Cookie set');
});

app.get('/readCookie', (req, res) => {
    res.json(req.cookies);
});

app.listen(3000);