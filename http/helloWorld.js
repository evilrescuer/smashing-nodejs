const http = require('http');

const server = http.createServer((req, res) => {
    console.log('HTTP服务器：已创建新的连接');
    res.writeHead(200, {
        'Content-Type': 'text/html',
    });
    res.write('Hello')
    setTimeout(() => {
        res.end('<b>World<b>');
    }, 1000);
});

server.listen(3000);

server.on('error', (error) => {
    console.log(error);
});
