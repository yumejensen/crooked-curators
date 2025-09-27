
import { server } from '../app'
const { Server } = require("socket.io");
const session = require("express-session");

// DB GAME MODEL
import { Game } from '../db/schemas/games'

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
  
  // CREATING A ROOM
  socket.on("createGame", async (gameInfo) => {
    // socket session id variable
    // const sessionId = socket.request.session.id
    
    // make a gameId (use first 5 of socket id)
    const roomCode = socket.id.substring(0, 5);
    
    // add the room to the database
    await Game.create({ gameCode: roomCode });
    
    // create and join the room
    await socket.join(roomCode);

    // log a message for who created what room
    console.log(`${gameInfo.username} created room ${roomCode}`);

    // emit the room code to that specific room
    io.to(roomCode).emit("sendRoomCode", {roomCode: roomCode});
    
  });


  // JOINING A ROOM
  socket.on("joinGame", async (joinAttempt) => {
  
    // variable for checking if the room exists in the db
    const roomExists = await Game.findOne({ where: { gameCode: joinAttempt.roomCode }})
    
    // if the room exists, (it is not null)
    if ( roomExists !== null){
      // join the room
      socket.join(joinAttempt.roomCode);

      // log a message for someone joining a room
      console.log(`player joined room ${joinAttempt.roomCode}`);
      
      // to the specific room, emit the room code
      io.to(joinAttempt.roomCode).emit("sendRoomCode", {roomCode: joinAttempt.roomCode});
     
    } else {
      // if the room does not exist in the db, don't join
      console.log('room does not exist in the db');
      // emit event back to user informing them the code doesn't work
      // something like: socket.emit("badCode")
    }

  }); 
  
});



// NOT WORKING - attempted to use reload to maintain session connection
// socket.request.session.reload((err) => {
//   if (err) {
//     return socket.disconnect();
//   }
//   socket.request.session.count++;
//   socket.request.session.save();
// });