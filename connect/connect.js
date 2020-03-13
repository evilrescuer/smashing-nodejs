const connect = require('connect');
const app = connect();

app.listen(3000);

app.use('/', (req, res, next) => {
    res.writeHead(200);
    res.end('Hello World');
    next();
});


