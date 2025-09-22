// import { io } from './app'

// // ----------SOCKET IO--------------

// io.on('connection', (socket) => {
//   console.log('A player connected');
//   socket.on('disconnect', () => {
//     console.log('A player disconnected')
//   })

//   socket.on('createGame', () => {
//     const gameId = socket.id.substring(1, 6)
//     console.log(`Creating a game, room ${gameId}`)
//     //rooms[gameId] = {}
//     socket.join(gameId)
//   })
// })