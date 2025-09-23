import { server } from '../app'
const { Server } = require("socket.io");
const session = require("express-session");

require("dotenv").config();
const { SESSION_SECRET } = process.env;

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

  console.log(`A player: ${socket.id} connected`);

  socket.on("disconnect", () => {
    console.log("A player disconnected");
  });
  
  socket.on("createGame", () => {
    // socket session id variable
    const sessionId = socket.request.session.id

    // make a gameId (use socket id)
    const roomCode = socket.id.substring(0, 5);
    console.log(`Creating a game, room ${roomCode}`)
    // add the code to rooms
    socket.join(roomCode)
    
    
    
});

socket.on("joinGame", () => {
    console.log('joining a game now')
})

});





// NOT WORKING - attempted to use reload to maintain session connection
// socket.request.session.reload((err) => {
//   if (err) {
//     return socket.disconnect();
//   }
//   socket.request.session.count++;
//   socket.request.session.save();
// });