const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200);
        res.end('Hello World');
    }
    else if (req.method === 'GET' && /^\/images\/.*\.jpg$/.test(req.url)) {
        fs.stat(`${__dirname}${req.url}`, (err, stat) => {
            if (err || !stat.isFile()) {
                handleNotFound(res);
                return;
            }
            serve(`${__dirname}${req.url}`, 'image/jpg')
        });
    }
    else {
        handleNotFound(res);
    }

    function serve(path, type) {
        res.writeHead(200, {
            'Content-Type': type
        });
        fs.createReadStream(path).pipe(res);
    }

}).listen(3000);

function handleNotFound(response) {
    response.writeHead(404);
    response.end('Not Found');
}
