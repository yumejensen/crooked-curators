// Game Settings Page that pops up after hitting 'Create Game'
import React from "react";
import { useState, useEffect } from "react";
import { socket } from "../socket";

// COMPONENTS
import JoinedPlayers from "../Components/JoinedPlayers";


const GameSettings = () => {
  
  const [code, setCode] = useState('')

  useEffect(() => {
    function getRoomCode(roomCodeObj){
      console.log('code from server', roomCodeObj.roomCode)
      setCode(roomCodeObj.roomCode)
    }
  
    socket.on("sendRoomCode", getRoomCode)
    
    return () => {
      socket.off("sendRoomCode", getRoomCode)
    }

  }, [code])
  
  console.log('state is:', code)
  return (
    <div>
      <h2> ROOM CODE: {code} </h2>
      <JoinedPlayers />
    </div>
  );
};

export default GameSettings;
