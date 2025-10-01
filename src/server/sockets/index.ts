import { server } from '../app';
import { Server } from 'socket.io';
import session from 'express-session';
import axios from 'axios';

// DB GAME MODEL
import { Game } from '../db/schemas/games';
import { User } from '../db/schemas/users';
import { User_Game } from '../db/schemas/users-games';

// session secret for express session
const { SESSION_SECRET, BASE_URL } = process.env;

// ----------SOCKET IO--------------

export const io = new Server(server, {
  connectionStateRecovery: {
    // the backup duration of the sessions and the packets
    maxDisconnectionDuration: 60 * 1000,
    // whether to skip middlewares upon successful recovery
    skipMiddlewares: true
  }
});

io.engine.use(
  session({
    resave: false,
    secret: SESSION_SECRET,
    saveUninitialized: false
  })
);

// hold games and players (temporarily)
const gamesPlayersMap = new Map();

io.on('connection', async socket => {

  console.log(`A player: ${socket.id} connected`);

  socket.on('disconnect', () => {
    console.log('A player disconnected');
  });

  // CREATING A ROOM
  // socket.on("createGame", async (gameInfo) => {
  //   // socket session id variable
  //   // const sessionId = socket.request.session.id

  //   // make a gameId (use first 5 of socket id)
  //   const gameCode = socket.id.substring(0, 5);

  //   // add the room to the database
  //   await Game.create({ gameCode: gameCode });
  //   const currentGame = await Game.findOne({ where: { gameCode: gameCode}})

  //   // add game to map
  //   gamesPlayersMap.set(gameCode, [])

  //   // create and join the room
  //   await socket.join(gameCode);

  //   // log a message for who created what room
  //   console.log(`${gameInfo.username} created room ${gameCode}`);

  //   // emit the room code to that specific room
  //   io.to(gameCode).emit("sendRoomCode", {roomCode: gameCode, game: currentGame, type: 'create'});

  // });

  // JOINING A ROOM
  socket.on('joinGame', async joinAttempt => {
    console.log(socket.request)

    // 0) make sure the room is in the database
    // variable for checking if the room exists in the db
    const roomExists = await Game.findOne({
      where: { gameCode: joinAttempt.roomCode }
    }).catch((err: any) => {
      console.error('Error checking if room exists', err)
    });


    // if the room exists, (it is not null)
    if (roomExists !== null) {

      // 1) join the room
      socket.join(joinAttempt.roomCode);
      // log a message for someone joining a room
      console.log(`player joined room ${joinAttempt.roomCode}`);
      
      
      // 2) add the player and game to user_games
      // find a user according to their socket id
      await User.findOne({
        where: { socketId: socket.id }
      })
        .then((user) => {
          // create an entry to the user_games table
          User_Game.create({
            user_id: user.id,
            game_id: roomExists.id
          })
        })
        .catch((err: any) => {
          console.error('Error adding to user_games', err)
        })

      // add player to map - TEMP SOLUTION -----------------------------------
      const playersSocketIds = gamesPlayersMap.get(joinAttempt.roomCode) || [];
      playersSocketIds.push(socket.id);
      gamesPlayersMap.set(joinAttempt.roomCode, playersSocketIds);
      //----------------------------------------------------------------------

      // to the specific room, emit the room code - make it visible for everyone
      io.to(joinAttempt.roomCode).emit('sendRoomCode', {
        roomCode: joinAttempt.roomCode,
        game: roomExists,
        type: 'join',
        player: playersSocketIds
      });

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
