// initialize express app
// setup handlebars
// setup static files
// setup storage middleware
// set route handlebars (controller actions)

const express = require('express');
const hbs = require('express-handlebars');

const { init: storage } = require('./models/storage');

const { catalog } = require('./controllers/catalog');
const { about } = require('./controllers/about');
const { details } = require('./controllers/details');
const { create, post: createPost } = require('./controllers/create');
const { edit, post: editPost } = require('./controllers/edit');
const { notFound } = require('./controllers/notFound');

start();

async function start() {

    const port = 3000;
    const app = express();
    

    app.engine('hbs', hbs({
        extname: '.hbs'
    }));
    
    app.set('view engine', 'hbs');
    app.use('/', express.static('static'));
    app.use('/js', express.static('js'));
    app.use(express.urlencoded({ extended: false })); // body-parser as middleware
    app.use(await storage()); // init from storage as middleware

    
    app.get('/', catalog);
    app.get('/about', about);
    app.get('/details/:id', details);

    app.get('/create', create);
    app.post('/create', createPost);

    app.get('/edit/:id', edit);
    app.post('/edit/:id', editPost);
    
    app.all('*', notFound);

    
    app.listen(port, () => console.log(`Server is listening on port ${port} ...`));
}