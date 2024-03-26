import http from 'node:http';
import path from 'node:path'
import * as fs from 'node:fs';
import querystring from 'node:querystring'
import  router  from './routes.js'

import mongoose from 'mongoose'

// main().catch(err => console.log(err));

// async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/test');

// }

const __dirname = path.resolve();

const server = http.createServer((req, res) => {
    handleRequest(req, res)
});

function handleRequest(request, response) {
    router.handleRequest(request, response)

    console.log(`Запрошенный адрес: ${request.url}`);

    const filePath = path.join(__dirname, '/dist', (request.url === '/' ? '/index.html' : request.url));
    if (fs.existsSync(filePath)) {
        postStaticFilesToClient(filePath, response)
    } else if (request.url === '/data') {
        response.writeHead(200, { "Content-Type": "application/json" })
        response.end(JSON.stringify({ data: 'test' }))
    } else {
        postStaticFilesToClient(__dirname + '/dist/index.html', response)
    }
}

function postStaticFilesToClient(url, res) {
    let file = path.join(url)
    let type = getContentType(url)
    fs.readFile(file, (err, data) => {
        res.writeHead(200, { "Content-Type": type })
        res.end(data)
    })
}


function getContentType(url) {
    switch (path.extname(url)) {
        case ".html":
            return "text/html"
        case ".css":
            return "text/css"
        case ".js":
            return "text/javascript"
        case ".json":
            return "application/json"
        default:
            return "application/octet-stream"
    }
}

server.listen(3000)