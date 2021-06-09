// handlebars: --------------------------------------------------------------------------------
//npm install express --save
//npm install express-handlebars --save

const express = require('express');
const hbs = require('express-handlebars');

const app = express();

app.engine('handlebars', hbs({
    extname: '.hbs'
}));

app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.send('Its working!');
});

app.listen(3000, console.log('Server listening on port 3000 ...'));

// handlebars: ---------------------------------------------------------------------------------

const express = require('express');
const hbs = require('express-handlebars');

const app = express();

app.engine('.hbs', hbs({
    //partialsDir: './views',
    // layoutsDir: 'newName' if we change the name of the layouts-Dir to newName.
    // defaultLayout: 'site' if we change the name of the main.hbs layout to site.hbs
    extname: '.hbs'
}));

//app.set('views', 'templates');  // set this if we change the name of the views folder to another name.
app.set('view engine', '.hbs');   // set .hbs extension ref from on controllers. (res.render('home'); or res.render('home.hbs');)

app.get('/', (req, res) => {
    //res.send('Its working!');
    //res.render('home', { layouts: false });
    res.render('home');
});

app.listen(3000, console.log('Server listening on port 3000 ...'));