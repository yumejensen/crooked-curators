// -------REQUIRES AND IMPORTS-----------

// initialize the dotenv config
import 'dotenv/config'

const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

// socket.io server
const http = require("http");
const server = http.createServer(app);


import passport from "passport";

// run the database file
const db = require("./db/index");

// --------------ENV------------------

const { SESSION_SECRET } = process.env;

// ------INIT GOOGLE STRATEGY--------
// require auth to initialize google strategy
require("./auth");

//----------IMPORT ROUTES-------------

import {
  authRouter,
  nameRandomizerRouter,
  curatorRouter,
  s3UrlRouter,
} from "./routes";

// ----------MIDDLEWARE---------------
// session middleware
app.use(
  session({
    resave: false,
    secret: SESSION_SECRET,
    saveUninitialized: false,
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// path to files
const CLIENT = path.resolve(__dirname, "../../dist");
const HTML = path.resolve(__dirname, "../../dist/index.html");

// parsing
app.use(bodyParser.json());

//----------SET ROUTES-------------

app.use("/auth/google", authRouter);
app.use("/name-randomizer", nameRandomizerRouter);
app.use("/curator", curatorRouter);
app.use("/s3Url", s3UrlRouter);

// serve static files from client
app.use(express.static(CLIENT));

// check if a user is logged in
const isLoggedIn = (req: any, res: any, next: any) => {
  // get a user from the session
  const user = req.session.user;
  if (user === null) {
    res.redirect("/");
  } else {
    next();
  }
};

app.get("/{*any}", (req, res) => {
  res.sendFile(HTML, (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// ---------SERVER LISTEN-------------

// port and listening
const port = 3000;

server.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});


// run the sockets/index.ts file 
require('./sockets')
export { app, server };
