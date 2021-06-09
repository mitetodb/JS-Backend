const http = require('http');
const router = require('./router');

router.registerHandler('/', (req, res) => {
    res.write(homePage);
    res.end();
});

const homePage = `
<html>
<body>
    <div>
        <h1>My Page</h1>
        <p>Welcome to my home page!</p>
    </div>
</body>
</html>`;

const port = 3000;
const server = http.createServer(requestHandler);

function requestHandler(req, res) {
    console.log('>>>', req.method, req.url);
    const handler = router.match(req.url);
    handler(req, res);
}

server.listen(port, () => console.log('Server listening on port ' + port));
