// contains a list of usernames from joined users on game settings page
import React, { useEffect, useState } from "react";

//import { socket } from '../socket'

// join code variable
let joinCode = '';


const JoinedPlayers = () => {
  const [players, setPlayers] = useState([])

  // socket.on("playerConnection", (joinedRoom) => {
  //   setPlayers([...joinedRoom.username])
  // })
  

  return (
    <div>
      <h3>Joined players:</h3>
    </div>
  );

};

export default JoinedPlayers;