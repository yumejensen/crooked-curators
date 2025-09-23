// Game code for users to join a game. Copiable and hideable
import React from "react";
import { Button, Input, Space, Typography } from "../antdComponents";
import { FaArrowCircleRight } from "react-icons/fa";


const GameCodeJoin = () => {

  const joinGame = () => {
    global.socket.emit('joinGame')
  }

  return (
    <div>
      <Typography>Enter Game Code to Join a Room</Typography>
      <p />
      <Space.Compact style={{ width: "100%" }}>
        <Input placeholder="Game Code" />
        <Button onClick={joinGame}>
          <FaArrowCircleRight />
        </Button>
      </Space.Compact>

    </div>
  );
};

export default GameCodeJoin;

// before it was <Button href='/game'>