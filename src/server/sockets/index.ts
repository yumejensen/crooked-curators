import { selectDisplayedStackedData } from 'recharts/types/state/selectors/axisSelectors';
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
  // // socket.emit('joinedEvent') // was using for testing

  socket.on("disconnect", () => {
    console.log("A player disconnected");
  });
  
  // CREATING A ROOM
  socket.on("createGame", (gameInfo) => {
    // socket session id variable
    // const sessionId = socket.request.session.id
    
    // make a gameId (use first 5 of socket id)
    const roomCode = socket.id.substring(0, 5);
    // create and join the room
    socket.join(roomCode)
    
    // add the room to the database
    Game.create({ gameCode: roomCode });
    

    console.log(`${gameInfo.username} created room ${roomCode}`)
    
    // add the room code to the database
    
    // server emits a new game
    socket.emit("newGame", {roomCode: roomCode})
    
    
    
  });


  // JOINING A ROOM
  socket.on("joinGame", (joinAttempt) => {

    // // check if the room exists in the database ATTEMPT 2
    // const roomExists = (str) => {
    //   Game.findOne({ where: { gameCode: str }})
    //   .then((result) => {
    //     if (result === null){
    //       console.log('this room does not exist')
    //     }
    //   })
    //   .then(() => {
    //     socket.join(str),
    //     console.log(`player joined room ${str}`)
    //   })
    //   .catch((err) => {
    //     console.log('join error', err)
    //   })
    // } 
    
    // roomExists(joinAttempt.roomCode)


    // check if room exists in db before ATTEMPT 1
    if ( Game.findOne({ where: { gameCode: joinAttempt.roomCode }}) !== null){
      socket.join(joinAttempt.roomCode)
      console.log(`player joined room ${joinAttempt.roomCode}!`)
    } else {
      // if the room exists, join it
      console.log('room does not exist in the db')
    }


    // // check if the room exists
    // if (rooms[joinAttempt.roomCode]){
    //   // if it does, join the room
      
    //   // let player = joinAttempt.username
    //   // socket.to(joinAttempt.roomCode).emit("playerConnection", {username: player})
    // }

    // inside the room, emit the players who connected
    //socket.to(joinAttempt.roomCode).emit("playersConnected", {})
  
    // emit playersConnected
    //socket.emit("playersConnected")
  })

  
  
  // ANOTHER JOIN GAME FUNCTION
  // // the cb is passed from the client side
  // // server side invokes cb
  // socket.on("joinGame", (roomCode, username, cb) => {
  //   let players = []

  //   socket.join(roomCode)
  //   const player = {
  //     username,
  //     id: socket.id
  //   }
  //   // add to players array
  //   players.push(player)
  //   // show players who have joined
  //   io.emit("new player", players)

  // })
  
});





// NOT WORKING - attempted to use reload to maintain session connection
// socket.request.session.reload((err) => {
//   if (err) {
//     return socket.disconnect();
//   }
//   socket.request.session.count++;
//   socket.request.session.save();
// });