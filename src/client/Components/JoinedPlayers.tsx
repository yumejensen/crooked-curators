// contains a list of usernames from joined users on game settings page
import React, { useEffect, useState } from "react";

import { socket } from '../socket'


// join code variable
let joinCode = '';

// socket listener for the room code
socket.on("sendRoomCode", (roomCodeObj) => {
  // receive the joinCode from the socket 
  // update the variable
  joinCode = roomCodeObj.roomCode
})

const JoinedPlayers = () => {
  const [players, setPlayers] = useState([])
  

  // socket.on("playerConnection", (joinedRoom) => {
  //   setPlayers([...joinedRoom.username])
  // })
  

  return (
    <div>
      <h3>Room code is: {joinCode} </h3>
      <h3>Joined players:</h3>
      <h4>{players}</h4>
    </div>
  );

};

export default JoinedPlayers;