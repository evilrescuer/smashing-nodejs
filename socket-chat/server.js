const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
app.use(express.static('public'));
const server = http.createServer(app);
server.listen(3000);
const io = socketIO.listen(server);

io.on('connection', (socket) => {
    console.log('服务端：连接成功');

    socket.on('join', (nickName) => {
        socket.nickName = nickName;

        // broadcast
        io.emit('announcement', `${nickName} joined the chat.`);
    });

    socket.on('text', (text, fn) => {
        io.emit('text', socket.nickName, text);

        // confirm the text has been sent
        fn(Date.now());
    });
});
