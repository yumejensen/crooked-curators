import React from 'react';
import { Button, Flex } from '../antdComponents';

// make a reference to the global socket
const socket = global.io()

const buttonStyle: React.CSSProperties = {
  width: '100%',
  height: 50
}

const CreateGameButton = () => {

  const createGame = () => {
    // access session cookie to ID the host 
    // send to server
    socket.emit('createGame')
  }

  return (
    <Flex style={buttonStyle} justify="center" align="center">
        <Button onClick={createGame}>
          Create Game
        </Button>
    </Flex>
  )
}

/*
<Flex style={buttonStyle} justify="center" align="center">
  <Button href="/game-settings">Create Game</Button>
</Flex>
*/

export default CreateGameButton;

