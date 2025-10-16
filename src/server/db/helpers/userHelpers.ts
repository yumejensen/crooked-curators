import axios from 'axios'
import { User } from '../schemas/users'

// const getUserId = (req) => {

//   return req.user.id
// }

// updates the username in the DB based on the player selected name
// takes in new username and userId
const updateUsername = async (newUsername, userId) => {
  await User.update(
    {username: newUsername},
    { where : { id: userId }}
  )
  .catch((err) => {
    console.error('failed to update username in db', err)
  })
}

// updates the socketId of a user
// takes in the socketId and a userId
const updateSocketId = async (socketId, userId) => {
  await User.update(
    {socketId: socketId},
    { where : { id: userId }}
  )
  .catch((err) => {
    console.error('failed to update socketId in db', err)
  })
}

export { updateUsername, updateSocketId }