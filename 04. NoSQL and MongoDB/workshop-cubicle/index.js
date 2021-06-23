const express = require('express');

const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');

const { init: storage } = require('./services/storage');

start();

async function start() {

    const port = 3000;
    const app = express();

    expressConfig(app);
    app.use(await storage()); // init from storage as middleware
    routesConfig(app);
    


    app.listen(port, () => console.log(`Server is listening on port ${port} ...`));
}