import { io } from '../sockets/index';
import { Router } from 'express';

// Game model from DB
import { Game } from '../db/schemas/games';
import { User } from '../db/schemas/users';
import { User_Game } from '../db/schemas/users-games';

/**
 * game router -> /games
 */
export const gamesRouter = Router();

// make a random string to make a game code with
// 8 characters long
const randomString = () => {
  return Math.random().toString(36).slice(2, 10);
};

// handle request to create a game
gamesRouter.post('/create', (req, res) => {
  const room = randomString()

  console.log('user in game: ', req.user);
  //@ts-ignore
  console.log('session in game: ', req.session);
  // create a room in the database with the random string
  Game.create(
    { gameCode: room }
  )
    .then(game => {
      res.json(game);
    })
    .catch(err => {
      console.log('could not add game to db', err);
    });

});


// think ill get rid of this

// gamesRouter.post('/join', (req, res) => {
//   // emit a join game event to the server
//   // get the socket id from the DB

//   const userObj = User.findOne({ where: { id: 1 } });
//   const socketId = userObj.socketId;

//   // emit a joingame event to that socket
//   io.sockets.sockets[socketId].emit('joinGame');
//   res.sendStatus(200);
// });

/*
   // get the socket id from the DB
      const userObj = User.findOne({ where: { id: 1} })
      const socketId = userObj.socketId

      // emit a joingame event to that socket
      io.sockets.sockets[socketId].emit('joinGame')
*/
