//Create Project with    npm init -y

//npm install express --save-exact

/* github

git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/mitetodb/JS-Backend.git
git push -u origin main 
*/


// logger.js ---------------------------------------
function logger(input) {
    console.log(`>>> ${input} <<<`);
}

module.exports = logger;

// demo.js ----------------------------------------
const logger = require('./logger.js');

let name1 = 'Pesho';

logger(name1);


// const _ = require('lodash'); // add 3rd party library

// const fs = require('fs');  // add core library (module, http, url, querystring, path, fs) 

const url = require('url');
let parsedUrl = url.parse('https://www.npmtrends.com/underscore-vs-lodash');
console.log(parsedUrl.hostname);

// url.js -------------------------------------------
const url = require('url');
const querystring = require('querystring');

let parsedUrl = url.parse('https://www.npmtrends.com/underscore-vs-lodash?year=2020&quality=great');
let queryParameters = querystring.parse(parsedUrl.query);

console.log(parsedUrl.hostname);

console.log(parsedUrl);

console.log(queryParameters);
console.log(queryParameters.year + ' is ' + queryParameters.quality);


// create server-------------------------------------
const http = require('http');
const port = 3000;

function requestHandler(req, res) {
    res.write('Hi');
    res.end();
}

const app = http.createServer(requestHandler);

app.listen(port, () => console.log('Server is listening...'));


// server switch ---------------------------------------------
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const port = 4000;

function requestHandler(req, res) {
    let reqUrl = url.parse(req.url);
    let params = querystring.parse(reqUrl.query);

    console.log(params);
    console.log(reqUrl.pathname);

    res.writeHead(200, {                      // Response status code
        'Content-Type': 'text/plain'
    });


    switch (reqUrl.pathname) {
        case '/cats':
            res.write('Hello Cats');
            break;
        case '/dogs':
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


