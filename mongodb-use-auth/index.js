const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const ONE_DAY = 24 * 60 * 60 * 1000;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: ['my secret'],
    maxAge: ONE_DAY,
}));
app.set('view engine', 'jade');

app.get('/', (req, res) => {
    res.render('index', {
        authenticated: false,
    })
});

app.get('/login', (req, res) => {
    res.render('login')
});

app.post('/login', (req, res) => {

});

app.get('/login/:signupEmail', (req, res) => {
    res.render('login', {
        signupEmail: req.params.signupEmail
    });
});

app.get('/signup', (req, res) => {
    res.render('signup')
});

app.post('/signup', (req, res) => {
    app.users.insert(req.body.user, (err, doc) => {
        if(err) return next(err);
        res.redirect(`/login/${doc[0].email}`);
    });
});

app.listen(3000, () => {
    console.log('监听3000端口中...')
});

// Connection URL
// const url = 'mongodb+srv://cluster0-mlfqi.mongodb.net/test';
const url = 'mongodb+srv://admin:admin@cluster0-mlfqi.mongodb.net/test';

// Database Name
const dbName = 'test';

// Create a new MongoClient
const client = new mongodb.MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Use connect method to connect to the Server
client.connect(function(err, db2) {
    console.log("Connected successfully to server");

    const db = db2.db(dbName);
    app.users = db.collection('test').find({}).toArray((err, result) => { // 返回集合中所有数据
        if (err) throw err;
        console.log(result);
        db2.close();
        client.close();
    });


});
