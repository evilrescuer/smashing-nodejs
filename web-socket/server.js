const express = require('express');
const websocketIO = require('websocket.io');
const app = express().listen(3000);
const server = websocketIO.attach(app);

server.on('connection', function (socket) {
    socket.on('message', function (message) {
        console.log(`服务端：客户端说 ${message}`)
    });

    socket.on('close', () => {
        console.log('服务端：websocket已关闭');
    });

    socket.send('你好');
});
