import axios from 'axios'
import { User } from '../schemas/users'
import { Game } from '../schemas/games'
import { User_Game } from '../schemas/users-games'


// update the User_Game table
const updateUsersGames = (roomCode) => {

  // get user ID from who is currently signed in
  // variable for user ID

  // get game ID from Game table according to inputted roomCode
  const game = Game.findOne({ where: { gameCode: roomCode }})
  const gamePrimaryKey = game.id
  


  // insert into the users games join table
  User_Game.create({
    include: [
      { association: gamePrimaryKey ,
        include: [User]
      }
    ]
  })

}
