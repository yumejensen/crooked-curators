const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

import passport from 'passport';


const db = require('./db/index');

// --------------ENV------------------

require('dotenv').config();

const { SESSION_SECRET } = process.env;

// ----------EXPRESS APP--------------

// initialize app
const app = express();

// require auth to initialize google strategy
require('./auth');

//----------IMPORT ROUTES-------------

import { authRouter, nameRandomizerRouter, curatorRouter } from './routes';

// session middleware
app.use(session({
  resave: false,
  secret: SESSION_SECRET,
  saveUninitialized: false,
}))

// initialize passport
app.use(passport.initialize());
app.use(passport.session());



// ----------MIDDLEWARE---------------

// path to files
const CLIENT = path.resolve(__dirname, '../../dist');
const HTML = path.resolve(__dirname, '../../dist/index.html');

// parsing
app.use(bodyParser.json());

//----------SET ROUTES-------------

app.use('/auth/google', authRouter);
app.use('/name-randomizer', nameRandomizerRouter);
app.use('/curator', curatorRouter);

// serve static files from client
app.use(express.static(CLIENT));


// check if a user is logged in
const isLoggedIn = (req: any, res: any, next: any) => {
  // get a user from the session
  const user = req.session.user;
  if (user === null){
    res.redirect('/')
  } else {
    next();
  }
}

app.get('/{*any}', (req, res) => {
  res.sendFile(HTML, (err) => {
    if(err){
      res.status(500).send(err);
    }
  })
})


// ---------SERVER LISTEN-------------

// port and listening
const port = 3000;

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

export { app };