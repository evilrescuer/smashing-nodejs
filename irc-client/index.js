const net = require('net');

const client = net.connect(3000, 'localhost', () => {
    // client.write(`NICK Mark\r\n`);
    // client.write(`USER Mark 0 * :realname\r\n`);
    // client.write(`JOIN #node.js\r\n`);
    client.write(`shan\r\n`);
    client.write(`Mark 你好，我准备下线了\r\n`);
});

client.setEncoding('utf8');
