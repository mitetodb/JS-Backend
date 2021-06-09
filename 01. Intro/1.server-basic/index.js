const http = require('http');

const port = 3000;
const server = http.createServer(requestHandler);

const html = `
<html>
<body>
    <div>
        <h1>My Page</h1>
        <p>Welcome to my page!</p>
    </div>
</body>
</html>`;

function requestHandler(req, res) {
    console.log('>>>', req.method, req.url);
    res.write(html);
    res.end();
}

server.listen(port, () => console.log('Server listening on port ' + port));