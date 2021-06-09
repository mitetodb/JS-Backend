const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

app.get('/catalog', (req, res) => {
    res.send('Catalog Page');
});

const data = {
    name: 'Peter',
    age: 23
};

app.post('/catalog', (req, res) => {
    //res.send(201, 'Article created');
    res.json(data);
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


app.listen(3000, () => console.log('Server listening on port 3000...'));

