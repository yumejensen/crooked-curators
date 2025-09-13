const express = require('express');
let passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('./db/index');

// --------------ENV------------------

require('dotenv').config();

const { SESSION_SECRET } = process.env;

// ----------EXPRESS APP--------------

// initialize app
const app = express();

// session middleware
app.use(session({
  resave: false,
  secret: SESSION_SECRET,
  saveUninitialized: false,
}))

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// require auth so it loads the auth in server init
require('./auth.ts');

// ----------MIDDLEWARE---------------

// path to files
const CLIENT = path.resolve(__dirname, '../../dist');
const HTML = path.resolve(__dirname, '../../dist/index.html');

// parsing
app.use(bodyParser.json());

// serve static files from client
app.use(express.static(CLIENT));

// main get endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ---------SERVER LISTEN-------------

// port and listening
const port = 3000;

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
