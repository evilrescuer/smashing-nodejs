let nickName = '';

window.onload = () => {
    const socket = io.connect();

    socket.on('connect', () => {
        nickName = prompt('What is your nickname?');
        if (!nickName) {
            socket.close();
            window.onload();
            return;
        }
        document.title = `${nickName}的聊天窗口`;
        socket.emit('join', nickName);

        document.getElementById('chat').style.display = 'block';
    });

    socket.on('announcement', (msg) => {
        addAnnouncement(msg);
    });

    socket.on('text', (from, msg) => {
        if (from !== nickName) {
            addMessage(from, msg);
        }
    });

    bindSendMessage(socket);
};

function bindSendMessage(socket) {
    const input = document.getElementById('input');
    document.getElementById('form').onsubmit = () => {
        const textLi = addMessage('me', input.value);
        socket.emit('text', input.value, (date) => {
            handleTextSended(textLi, date);
        });

        input.value = '';
        input.focus();

        return false;
    };
}

function handleTextSended(textLi, date) {
    textLi.className += ' confirmed';
    textLi.title = date;
}

function addMessage(from, text) {
    const li = document.createElement('li');
    li.className = 'message';
    li.innerHTML = `<b>${from}</b>: ${text}`;
    document.getElementById('messages').appendChild(li);
    return li;
}

function addAnnouncement(msg) {
    const li = document.createElement('li');
    li.className = 'announcement';
    li.innerHTML = msg;
    document.getElementById('messages').appendChild(li);
}

