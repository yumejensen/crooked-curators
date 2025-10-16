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
      <h2>Joined players:</h2>
      <List>
        {
          players.map((player, index) => {
            return (
              <List.Item key={index}>
                <h3>{player}</h3>
              </List.Item>
            )
          })
        }
      </List>

    </div>
  );
  
  
      
};

export default JoinedPlayers;