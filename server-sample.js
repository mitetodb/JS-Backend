const http = require('http');
const url = require('url');
const querystring = require('querystring');

const port = 4000;

function requestHandler(req, res) {
    let reqUrl = url.parse(req.url);
    let params = querystring.parse(reqUrl.query);

    console.log(params);
    console.log(reqUrl.pathname);

    switch (reqUrl.pathname) {
        case '/cats':
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(`<h1>Hello Cats</h1>`);
            break;
        case '/dogs':
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.write('Hello Dogs');
            break;
        default:
            res.write('Hello Human');
            break;
    }

    /* res.write('Hello from Node.js');          // UTF-8 Encoding */
    res.end();                                // Always end response.

}

const app = http.createServer(requestHandler);

app.listen(port, () => console.log('Server is listening...'));
