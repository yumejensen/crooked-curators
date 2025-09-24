// contains a list of usernames from joined users on game settings page
import React, { useEffect, useState } from "react";

import { socket } from '../socket'


socket.on("newGame", (newGameInfo) => {
  // display the room code
  console.log('room code, server to client:', newGameInfo.roomCode)
  
})

socket.onAny((eventName, ...args) => {
  console.log(eventName, args)
})

const JoinedPlayers = () => {
  const [players, setPlayers] = useState([])
  
  const [roomCode, setRoomCode] = useState('')



  
  socket.on("playerConnection", (joinedRoom) => {
    setPlayers([...joinedRoom.username])
  })
  

  return (
    <div>
      <h3>Room code is: {}</h3>
      <h3>Joined players:</h3>
      <h4>{players}</h4>
    </div>
  );
};

export default JoinedPlayers;