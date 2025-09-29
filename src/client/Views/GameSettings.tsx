// Game Settings Page that pops up after hitting 'Create Game'
import React from "react";
import { useState, useEffect } from "react";
import { Button } from '../antdComponents'

// COMPONENTS
import JoinedPlayers from "../Components/JoinedPlayers";


const GameSettings = ({roomCode}) => {

  return (
    <div>
      <h2> ROOM CODE: {roomCode} </h2>
      <JoinedPlayers />

      <br></br>
      <Button>START GAME</Button>
    </div>
  );
};

export default GameSettings;
