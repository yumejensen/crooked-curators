// Page that holds the choose avatar, join game, create a game menu

import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


import {
  Button,
  ReloadOutlined,
  Flex,
  FlexProps,
  Row,
  Col,
  Card,
  Input,
  Space
} from '../antdComponents';

// import the user context
import { useUserContext } from "../context";

import { FaArrowCircleRight } from 'react-icons/fa';

import AvatarPicker from '../Components/AvatarPicker';
import CreateGameButton from '../Components/CreateGameButton';
import GameCodeJoin from '../Components/GameCodeJoin';
import HomepageSignInToPlay from '../Components/HomepageSignInToPlay';
import HomepageCreateJoin from '../Components/HomepageCreateJoin';
import HomepageName from '../Components/HomepageName';

// styling

const largeStyle: React.CSSProperties = {
  width: '100%',
  height: 500,
  borderRadius: 6
  //   border: '3px solid #3B262C',
};

// const randomizerStyle: React.CSSProperties = {
//   width: '100%',
//   height: 75,
//   borderRadius: 6
//   //   border: '3px solid #3B262C',
// };

// const joinCreateStyle: React.CSSProperties = {
//   width: "100%",
//   height: 350,
//   borderRadius: 6,
//   border: "3px solid #3B262C",
// };

const buttonStyle: React.CSSProperties = {
  width: '100%',
  height: 50
};

type HomePageProps = {
  socket: any
}

const Homepage: React.FC = ({socket}:HomePageProps) => {

  // --------------------[STATES]---------------------
  
  const [randomName, setRandomName] = useState('');

  // logged in context from the user
  const { loggedIn } = useUserContext().user;

  // --------------------[HANDLERS]--------------------


  const handleRandomizeName = () => {
    axios.get('/name-randomizer').then(res => {
      setRandomName(res.data);
    });
  };

  useEffect(() => {
    handleRandomizeName();
  }, []);

  // --------------------[RENDER]---------------------

  return (
    <Flex>
      <Flex style={largeStyle} justify="center" align='flex-start'>
        <Col>
          <Row>
            <h1>Welcome to Crooked Curators!</h1>
          </Row>
          <Row gutter={15}>

            <HomepageName 
              username={randomName}
              handleRandomizeName={handleRandomizeName}
              loggedIn={loggedIn}
            />

            {/* <Flex style={randomizerStyle} justify='center' align='center'>
              <Col>
                <Card
                  style={{ width: 250, height: 50, textAlign: 'center' }}
                  size='small'
                >
                  <h2
                    style={{
                      fontSize: '15px',
                      marginTop: '1px'
                    }}
                  >
                    {randomName}
                  </h2>
                </Card>
              </Col>
              <Col>
                <Button onClick={handleRandomizeName}>
                  <ReloadOutlined />
                </Button>
              </Col>
            </Flex> */}
          </Row>
          <Row>

            {/* <Flex style={joinCreateStyle} justify='center' align='center'>
              <Col>
              <Row>
              <CreateGameButton username={randomName} />
              </Row>
              <p />
              <Row>
              <GameCodeJoin username={randomName} />
              </Row>
              </Col>
              </Flex> */}

            <HomepageCreateJoin username={randomName} loggedIn={loggedIn}/>

            <HomepageSignInToPlay loggedIn={loggedIn} />

          </Row>
        </Col>
      </Flex>
    </Flex>
  );
};

export default Homepage;
