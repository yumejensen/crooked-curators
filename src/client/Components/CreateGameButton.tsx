import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex } from '../antdComponents';

import axios from 'axios'
import { socket } from '../socket'

const buttonStyle: React.CSSProperties = {
  width: '100%',
  height: 50
}


const CreateGameButton = ({username}) => {

  const createGame = () => {
    // access session cookie to ID the host 
    
    // send the username to the server
    socket.emit('createGame', {username: username})

 
  }
  
  // send a request to /create-game
  const handleCreateGame = () => {
    axios.post('/games/create')
    .then(({data}) => {
      console.log(data)
    })
    .catch((err) => {
      // can add client message for user (little popup)
      console.error('create game failed', err)
    })
  }

  return (
    <Flex style={buttonStyle} justify="center" align="center">
        <Link to='/game-settings' >

          <Button onClick={handleCreateGame} >
            Create Game
          </Button>

        </Link>
    </Flex>
  )
}

/*
<Flex style={buttonStyle} justify="center" align="center">
  <Button href="/game-settings">Create Game</Button>
</Flex>
*/

export default CreateGameButton;

