// contains a list of usernames from joined users on game settings page
import React, { useEffect, useState } from "react";
import List from "antd/es/list"

//import { socket } from '../socket'

// join code variable
let joinCode = '';


const JoinedPlayers = ({players}) => {
  

  // socket.on("playerConnection", (joinedRoom) => {
  //   setPlayers([...joinedRoom.username])
  // })
  

  return (
    <div>
      <h3>Joined players:</h3>
      <List>
        {
          players.map((player, index) => {
            return (
              <List.Item key={index}>
                {player}
              </List.Item>
            )
          })
        }
      </List>

    </div>
  );
  
  
      
};

export default JoinedPlayers;