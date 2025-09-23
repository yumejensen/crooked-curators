// -------REQUIRES AND IMPORTS-----------
const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

// socket.io
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");


import { type Request } from "express";
import passport from "passport";

// run the database file
const db = require("./db/index");

// --------------ENV------------------

require("dotenv").config();

const { SESSION_SECRET } = process.env;

// ------INIT GOOGLE STRATEGY--------
// require auth to initialize google strategy
require("./auth");

//----------IMPORT ROUTES-------------

import { authRouter, nameRandomizerRouter, curatorRouter } from "./routes";

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

// ----------SOCKET IO--------------

const io = new Server(server, {
  connectionStateRecovery: {
    // the backup duration of the sessions and the packets
    maxDisconnectionDuration: 60 * 1000,
    // whether to skip middlewares upon successful recovery
    skipMiddlewares: true,
  }
});

io.engine.use(session({
    resave: false,
    secret: SESSION_SECRET,
    saveUninitialized: false,
}));

io.on("connection", (socket) => {

  console.log(`A player: ${socket.id.substring(0, 5)} connected`);

  socket.on("disconnect", () => {
    console.log("A player disconnected");
  });
  
  socket.on("createGame", () => {
    console.log('socket session:', socket.request.session.id)

    // IN PROGRESS - making a gameId and join a room
    // const gameId = socket.id.substring(0, 5);
    // console.log(`Creating a game, room ${gameId}`);
    // //rooms[gameId] = {}
    // socket.join(gameId);


    // NOT WORKING - attempted to use reload to maintain session connection
    // socket.request.session.reload((err) => {
    //   if (err) {
    //     return socket.disconnect();
    //   }
    //   socket.request.session.count++;
    //   socket.request.session.save();
    // });

  });
});

export { app, io };
