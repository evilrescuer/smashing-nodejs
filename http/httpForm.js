const http = require('http');
const qs = require('querystring');

const htmlStr = `
    <form method="post" action="/url">
        <h1>My Form</h1>
        <fieldset>
            <label>Personal Information</label>
            <p>What's your name?</p>
            <input type="text" name="name">
            <p><button>Submit</button></p>
        </fieldset>
    </form>
`;

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html',
    });

    if ('/' === req.url) {
        res.end(htmlStr);
    }
    else if ('/url' === req.url && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            res.end(`
                <p>Content-Type: <em>${req.headers['content-type']}</em></p>
                <p>Your name is ${qs.parse(body).name}</p>
            `);
        });
    }
    else {
        res.writeHead(404);
        res.end('Not Found');
    }

}).listen(3000);
