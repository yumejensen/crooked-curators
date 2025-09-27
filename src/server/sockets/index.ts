import { server } from '../app'
import { Server } from "socket.io";
import session from "express-session";

// DB GAME MODEL
import { Game } from '../db/schemas/games'
import { User } from '../db/schemas/users'

// session secret for express session
const { SESSION_SECRET } = process.env;

// ----------SOCKET IO--------------

export const io = new Server(server, {
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

// hold games and players (temporarily)
const gamesPlayersMap = new Map()

io.on("connection", async (socket) => {
  // if a user is signed in
  // add the socket id to the db in relation to a user
  // making it just my user for now
  await User.update(
    {socketId: socket.id},
    {
      where : {
        id: 1
      }
    }
  );


  console.log(`A player: ${socket.id} connected`);

  socket.on("disconnect", () => {
    console.log("A player disconnected");
  });
  
  // CREATING A ROOM
  socket.on("createGame", async (gameInfo) => {
    // socket session id variable
    // const sessionId = socket.request.session.id
    
    // make a gameId (use first 5 of socket id)
    const gameCode = socket.id.substring(0, 5);
    
    // add the room to the database
    await Game.create({ gameCode: gameCode });
    const currentGame = await Game.findOne({ where: { gameCode: gameCode}})

    // add game to map
    gamesPlayersMap.set(gameCode, [])

    // create and join the room
    await socket.join(gameCode);

    // log a message for who created what room
    console.log(`${gameInfo.username} created room ${gameCode}`);

    // emit the room code to that specific room
    io.to(gameCode).emit("sendRoomCode", {roomCode: gameCode, game: currentGame, type: 'create'});
    
  });


  // JOINING A ROOM
  socket.on("joinGame", async (joinAttempt) => {
  
    // variable for checking if the room exists in the db
    const roomExists = await Game.findOne({ where: { gameCode: joinAttempt.roomCode }})
    
    // if the room exists, (it is not null)
    if ( roomExists !== null){
      // join the room
      socket.join(joinAttempt.roomCode);

      // add player to map
      const playersSocketIds = gamesPlayersMap.get(joinAttempt.roomCode) || [];
      playersSocketIds.push(socket.id)

      gamesPlayersMap.set(joinAttempt.roomCode, playersSocketIds)

      // log a message for someone joining a room
      console.log(`player joined room ${joinAttempt.roomCode}`);
      
      // to the specific room, emit the room code
      io.to(joinAttempt.roomCode).emit("sendRoomCode", {roomCode: joinAttempt.roomCode, game: roomExists, type: 'join', player: playersSocketIds});
     
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