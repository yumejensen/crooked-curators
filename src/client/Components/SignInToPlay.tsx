// Card that covers the create and start if user is not signed in

import React from "react";
import { useState} from "react";
import { Card, Flex } from '../antdComponents'


const SignInToPlay = ({loggedIn}) => {

  if (loggedIn){
    return null;
  }

  return (
    
      <Flex align='center'>

        <Card style={{ width: 300 }}>
          <h3> Sign in to Create a Game or Join a Game </h3>
        </Card>

      </Flex>
  
  );
};

export default SignInToPlay;