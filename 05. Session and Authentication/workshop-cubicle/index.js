const express = require('express');

const expressConfig = require('./config/express');
const databaseConfid = require('./config/database');
const routesConfig = require('./config/routes');

const storage = require('./middlewares/storage');
const logger = require('./middlewares/logger');
const { SERVER_PORT } = require('./config/config');


start();

async function start() {

    const app = express();

    app.use(logger());

    await databaseConfid(app);
    expressConfig(app);
    
    app.use(await storage());
    routesConfig(app);

    app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT} ...`));
}