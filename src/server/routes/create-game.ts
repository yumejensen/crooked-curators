import { io } from '../sockets/index'
import { Router } from 'express'

// Game model from DB
import { Game } from '../db/schemas/games'

// create game router -> /create-game
export const createGameRouter = Router()

// make a random string to make a game code with
// 8 characters long 
const randomString = Math.random().toString(36).slice(2, 10)

// handle request to create a game
createGameRouter.post('/', (req, res) => {
  // create a room in the database with the random string
  Game.create({ gameCode: randomString })
    .then(() => {
      // emit a createGame event?
    })
    .catch((err) => {
      console.log('could not add game to db', err)
    })

})


