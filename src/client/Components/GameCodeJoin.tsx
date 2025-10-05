// Game code for users to join a game. Copiable and hideable
import React from "react";
import { useState } from "react"
import { Link } from 'react-router-dom';
import { Button, Input, Space, Typography } from "../antdComponents";
import { FaArrowCircleRight } from "react-icons/fa";

import { useUserContext } from '../context';

const GameCodeJoin = ({username, socket}) => {
  // user context
  const { setUser } = useUserContext();
  // state for input field
  const [roomCode, setRoomCode] = useState('');

  const handleInput = (e) => {
    // update gameCode state with entry from input field
    setRoomCode(e.target.value)
  }

  const joinGame = () => {
    // emit a join game event to server
    socket?.emit('joinGame', {username: username, roomCode: roomCode})
    // update the user context with the chosen username
    setUser({ username: username, loggedIn: true });
  }

  return (
    <div>
      <Typography>Enter Game Code to Join a Room</Typography>
      <p />
      <Space.Compact style={{ width: "100%" }}>
        <Input placeholder="Game Code" onChange={handleInput} />

        <Link to='/game-settings' >
          <Button 
            onClick={joinGame}
            disabled={!socket || !roomCode}
          >
            <FaArrowCircleRight />
          </Button>
        </Link>
        
      </Space.Compact>

    </div>
  );
};

export default GameCodeJoin;

// before it was <Button href='/game'>