import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex } from '../antdComponents';

import axios from 'axios'


const buttonStyle: React.CSSProperties = {
  width: '100%',
  height: 50
}

const CreateGameButton = ({username}) => {

  // send a request to /create-game
  // makes a room code and adds it to the db
  const handleCreateGame = () => {
    axios.post('/games/create')
    .then(({data}) => {
      console.log(data)
      // emit a join game from here
      // join with the roomCode that was just created
      //socket?.emit('joinGame', {username: username, roomCode: data.gameCode})
    })
    .catch((err) => {
      // can add client message for user (little popup)
      console.error('create game failed', err)
    })
    
  }

  return (
    <Flex style={buttonStyle} justify="center" align="center">
        {/* <Link to='/game-settings' > */}

          <Button onClick={handleCreateGame} >
            Create Game
          </Button>

        {/* </Link> */}
    </Flex>
  )
}


export default CreateGameButton;

