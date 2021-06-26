const express = require('express');

const expressConfig = require('./config/express');
const databaseConfid = require('./config/database');
const routesConfig = require('./config/routes');

const storage = require('./middlewares/storage');

start();

async function start() {

    const port = 3000;
    const app = express();

    expressConfig(app);
    await databaseConfid(app);
    
    app.use(await storage()); // init from storage as middleware
    routesConfig(app);
    


    app.listen(port, () => console.log(`Server is listening on port ${port} ...`));
}