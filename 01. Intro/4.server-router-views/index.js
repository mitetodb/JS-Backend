const http = require('http');
const router = require('./router');

const aboutController = require('./controllers/aboutController');
const catalogController = require('./controllers/catalogController');
const homeController = require('./controllers/homeController');


router.registerHandler('/', homeController);
router.registerHandler('/catalog', catalogController);
router.registerHandler('/about', aboutController);

const port = 3000;
const server = http.createServer(requestHandler);

function requestHandler(req, res) {
    console.log('>>>', req.method, req.url);
    const handler = router.match(req.url);
    handler(req, res);
}

server.listen(port, () => console.log('Server listening on port ' + port));
