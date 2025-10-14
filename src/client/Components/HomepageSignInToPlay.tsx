// Card that covers the create and start if user is not signed in

import React from "react";
import { useState} from "react";
import { Card, Flex, Col } from '../antdComponents'

const joinCreateStyle: React.CSSProperties = {
  width: "100%",
  height: 350,
};

const HomepageSignInToPlay = ({loggedIn}) => {

  if (loggedIn){
    return null;
  }

  return (
    
      <Flex style={joinCreateStyle} justify="center" align="center">
        <Col>

        <Card style={{ width: 300 }}>
          <h3> Sign in to Create a Game or Join a Game </h3>
        </Card>

        </Col>
      </Flex>
  
  );
};

export default HomepageSignInToPlay;