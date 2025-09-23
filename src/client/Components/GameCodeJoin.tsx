// Game code for users to join a game. Copiable and hideable
import React from "react";
import { useState } from "react"
import { Link } from 'react-router-dom';
import { Button, Input, Space, Typography } from "../antdComponents";
import { FaArrowCircleRight } from "react-icons/fa";

const socket = global.io()

const GameCodeJoin = ({username}) => {
  // state for input field
  const [roomCode, setRoomCode] = useState('');

  const handleInput = (e) => {
    // update gameCode state with entry from input field
    setRoomCode(e.target.value)
  }

  const joinGame = () => {
    // global.socket.emit('joinGame', {roomCode: roomCode})
    socket.emit('joinGame', {username: username, roomCode: roomCode})
  }

  return (
    <div>
      <Typography>Enter Game Code to Join a Room</Typography>
      <p />
      <Space.Compact style={{ width: "100%" }}>
        <Input placeholder="Game Code" onChange={handleInput} />

        <Link to='/game-settings' >
          <Button onClick={joinGame}>
            <FaArrowCircleRight />
          </Button>
        </Link>
        
      </Space.Compact>

    </div>
  );
};

export default GameCodeJoin;

// before it was <Button href='/game'>