import { server } from '../app';
import { Server } from 'socket.io';
import session from 'express-session';
import axios from 'axios';

// DB GAME MODEL
import { Game } from '../db/schemas/games';
import { User } from '../db/schemas/users';
import { User_Game } from '../db/schemas/users-games';
import { Round } from '../db/schemas/rounds';
import RoundJudging from '../../client/Components/RoundJudging';

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


// _______________________________________________________________________________
// GLOBAL VARIABLES
// hold games and players (temporarily)
const gamesPlayersMap = new Map();

// hold the current game information
let currentGame;
let currentRound;
let curator;
let roundCount = 0
let allPlayers = [];



// _______________________________________________________________________________
io.on('connection', async socket => {

  console.log(`A player: ${socket.id} connected`);

  // _______________________________________________________________________________
  // DISCONNECT
  socket.on('disconnect', () => {
    console.log('A player disconnected');
  });


  // _______________________________________________________________________________
  // JOINING A ROOM
  socket.on('joinGame', async joinAttempt => {

    // 0) make sure the room is in the database
    // variable for checking if the room exists in the db
    const roomExists = await Game.findOne({
      where: { gameCode: joinAttempt.roomCode }
    }).catch((err: any) => {
      console.error('Error checking if room exists', err)
    });


    // if the room exists, (it is not null)
    if (roomExists !== null) {

      // update currentGame variable with room
      currentGame = roomExists;

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
          user.update({ username: joinAttempt.username })
            .then(() => {
              // create an entry in user_games table
              User_Game.create({
                user_id: user.id,
                game_id: roomExists.id
              })
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
        players: playersSocketIds
      });

    } else {
      // if the room does not exist in the db, don't join
      console.log('room does not exist in the db');
      // emit event back to user informing them the code doesn't work
        // something like: socket.emit("badCode")
    }
  }); // end of join game


  // _______________________________________________________________________________
  // STARTING A GAME + ADVANCING A STAGE
  // note: can still keep startGame which has finding players logic + advanceRound
  // nextStage can have just an invocation of advanceRound
  socket.on('nextStage', async () => {

    console.log('next stage event triggered!')

    // query user_games table, find users where gameid = current game id
    // sort by created at order
    allPlayers = await User_Game.findAll({
      where: {
        game_id: currentGame.id
      },
      order: [['createdAt', 'ASC']]
    })


    // advance the first round
    advanceRound(null);

  }) // end of start game

  socket.on('curatorSelect', async ({title, image}) => {
    await currentRound.update({ referenceName: title, referenceSrc: image })
    // send players to the artist stage
    io.to(currentGame.gameCode).emit('referenceSelected', { title, image })
  })

  // _______________________________________________________________________________
  // ROUND PROGRESSION HANDLER
  async function advanceRound(prevRound) {
    console.log('advancing round!')

    // select curator based on roundCount index on the allPlayers array
    curator = await User.findOne({
      where: { id: allPlayers[roundCount].user_id }
    })

    // assign currentRound, then add round to database
    currentRound = await Round.create({
      game_id: currentGame.id,
      curator_id: curator.id
    })

    // increment the round by 1
    roundCount++;


    // GAME CONTEXT
    // define the round's state (matches front end round context)
    let roundState = {
      stage: 'reference',
      role: 'artist',
      code: currentGame.gameCode,
      curator: {
        username: curator.username,
        finished: false
      },
      players: allPlayers.map(async ({ user_id }) => {
        const player = await User.findOne({ where: { id: user_id } })
        // add only the parts needed for other players
        return { username: player.username, finished: false }
      })
    }

    // player emit - targets game room except curator
    // pass in roundState
    io.to(currentGame.gameCode).except(curator.socketId).emit('newRound', roundState);

    // reassign roundState values for the curator
    roundState.role = 'curator'

    // curator emit - targets only curator socket
    // pass in roundState
    io.to(curator.socketId).emit('newRound', roundState);


  }



  
  // _______________________________________________________________________________


}); // end of connection






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



// NOT WORKING - attempted to use reload to maintain session connection
// socket.request.session.reload((err) => {
//   if (err) {
//     return socket.disconnect();
//   }
//   socket.request.session.count++;
//   socket.request.session.save();
// });
