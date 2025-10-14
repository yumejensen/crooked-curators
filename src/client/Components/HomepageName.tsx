import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Flex, Col, Button, ReloadOutlined } from '../antdComponents';

const randomizerStyle: React.CSSProperties = {
  width: '100%',
  height: 75,
  borderRadius: 6
};

const HomepageName = ({username, handleRandomizeName, loggedIn}) => {

  if (!loggedIn){
    return null;
  }

  return (
    <Flex style={randomizerStyle} justify="center" align="center">
      <Col>
        <Card
          style={{ width: 250, height: 50, textAlign: "center" }}
          size="small"
        >
          <h2
            style={{
              fontSize: "15px",
              marginTop: "1px",
            }}
          >
            {username}
          </h2>
        </Card>
      </Col>
      <Col>
        <Button onClick={handleRandomizeName}>
          <ReloadOutlined />
        </Button>
      </Col>
    </Flex>
  );
};

export default HomepageName;
