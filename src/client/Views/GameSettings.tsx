// Game Settings Page that pops up after hitting 'Create Game'
import React from "react";
import { useState, useEffect } from "react";
import { useGameContext } from "../context";

// UI
import { Button, Typography } from '../antdComponents'
const { Paragraph, Text } = Typography;

// COMPONENTS
import JoinedPlayers from "../Components/JoinedPlayers";

const GameSettings = ({roomCode, players, socket}) => {
  const { game, setGame } = useGameContext()
  
  const startGame = () => {
    // emit a nextStage event to server
    socket.emit('nextStage')
  }

  return (
    <div>
      <h2> ROOM CODE: </h2>
      <Typography.Title level={2} copyable>{roomCode}</Typography.Title>
      
      <br></br>
      <JoinedPlayers players={players} />
      <br></br>
      <Button onClick={startGame}>START GAME</Button>
    </div>
  );
};

export default GameSettings;
