const express = require('express');
const bodyParser = require('express').urlencoded;
const expressSession = require('express-session');
const bcrypt = require('bcrypt');

const routes = require('./server-2-controllers');


const users = {};

const app = express();

app.use(bodyParser({
    extended: false
}));

app.use(expressSession({
    secret: 'my random secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

routes(app);


app.post('/register', async (req, res) => {
    const id = ('00000000' + (Math.random() * 99999999 | 0).toString(16)).slice(-8);

    const hashedPassword = await bcrypt.hash(req.body.password, 4);

    users[id] = {
        username: req.body.username,
        hashedPassword
    };

    console.log('>>> New user: ', users);

    res.redirect('/login');
});

app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = Object.entries(users).find(([id, u]) => u.username == username);

    console.log('Checking password: ', password, ' for user: ', user[1].username);

    const passwordsMatch = await bcrypt.compare(password, user[1].hashedPassword);
console.log(passwordsMatch);

    if (user && passwordsMatch) {
        req.session.user = {
            _id: user[1].id,
            username
        };
        res.redirect('/');
    } else {
        res.send('Wrong password');
    }
});


app.listen(3000);

