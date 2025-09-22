import React from 'react';
import { Button, Flex } from '../antdComponents';

// // make a reference to the global socket
// const socket = global.io()

const buttonStyle: React.CSSProperties = {
  width: '100%',
  height: 50
}

const JoinGameButton = () => {

//   const joinGame = () => {
//     socket.emit('joinGame')
//   }

  return (
    <Flex style={buttonStyle} justify="center" align="center">
        <Button >
          Join Game
        </Button>
    </Flex>
  )
}

export default JoinGameButton;