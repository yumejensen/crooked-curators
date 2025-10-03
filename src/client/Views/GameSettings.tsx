// Game Settings Page that pops up after hitting 'Create Game'
import React from "react";
import { useState, useEffect } from "react";
import { Button } from '../antdComponents'
import { useGameContext } from "../context";
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
      <h2> ROOM CODE: {roomCode} </h2>
      <JoinedPlayers players={players} />
      <br></br>
      <Button onClick={startGame}>START GAME</Button>
    </div>
  );
};

export default GameSettings;
