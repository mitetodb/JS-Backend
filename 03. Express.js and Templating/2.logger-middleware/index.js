const path = require('path');

const express = require('express');
const catalogRouter = require('./catalog');
const fallback = require('./fallback');
const isAdmin = require('./guard');
const logger = require('./logger');

const app = express();

app.use('/public', express.static('static'));

//app.use(catalogRouter);
app.use(logger);

//app.join(__filename, 'static' , 'tos.pdf');


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

app.get('/tos', (req, res) => {
    res.sendFile(__dirname + '/demo.pdf');
    //res.download('./demo.pdf');
});

app.get('/contact', (req, res) => {
    res.redirect('/about');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.get('/admin', isAdmin, (req, res) => {
    res.send('Admin Page');
});


app.use(fallback);

app.listen(3000, () => console.log('Server listening on port 3000...'));
