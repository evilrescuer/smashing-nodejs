const net = require('net');

let count = 0;
const users = {};

const server = net.createServer((connection) => {
    console.log('TCP服务器：已创建新的连接');
    connection.setEncoding('utf8');
    connection.write(`> 当前聊天室人数: ${count}\n> 请输入你的昵称：`);
    count ++;
    let nickName;

    connection.on('data', (data) => {
        const input = data.replace('\r\n', '').trim();
        if (!input) return;
        console.log('收到新数据:', input);

        if (nickName) {
            // chatting message
            for (let tempNickName in users) {
                if (tempNickName !== nickName) {
                    users[tempNickName].write(`> ${nickName}说：${input}\n`);
                }
            }
        }
        else {
            // nickName message
            if (input in users) {
                connection.write('昵称重复，请重新输入：');
                return;
            }
            else {
                nickName = input;
                users[nickName] = connection;

                for (let tempNickName in users) {
                    if (tempNickName !== nickName) {
                        users[tempNickName].write(`> ${nickName}上线了\n`);
                    }
                }
            }
        }

    });

    connection.on('close', () => {
        count --;
        if (nickName) {
            for (let tempNickName in users) {
                if (tempNickName !== nickName) {
                    users[tempNickName].write(`> ${nickName}下线了\n`);
                }
            }
            delete users[nickName];
        }
    });

    connection.on('error', (error) => {
        console.log(error);
    });
});

server.listen(3000, () => {
   console.log('TCP服务器：监听3000端口');
});
