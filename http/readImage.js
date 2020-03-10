const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    const readStream = fs.createReadStream('image.png');
    readStream.on('data', (data) => {
        res.write(data);
    });
    readStream.on('end', () => {
        res.end();
    });
}).listen(3000);
