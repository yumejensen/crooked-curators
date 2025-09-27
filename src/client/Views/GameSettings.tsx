// Game Settings Page that pops up after hitting 'Create Game'
import React from "react";
import { useState, useEffect } from "react";

// COMPONENTS
import JoinedPlayers from "../Components/JoinedPlayers";


const GameSettings = ({roomCode}) => {

  return (
    <div>
      <h2> ROOM CODE: {roomCode} </h2>
      <JoinedPlayers />
    </div>
  );
};

export default GameSettings;
