// Page that holds the choose avatar, join game, create a game menu

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import {
  Button,
  ReloadOutlined,
  Flex,
  FlexProps,
  Row,
  Col,
  Card,
  Input,
  Space,
} from '../antdComponents'

import { FaArrowCircleRight } from "react-icons/fa";

import AvatarPicker from "../Components/AvatarPicker";
import CreateGameButton from "../Components/CreateGameButton";
import JoinGameButton from "../Components/JoinGameButton";
// styling

const largeStyle: React.CSSProperties = {
  width: '100%',
  height: 500,
  borderRadius: 6,
  //   border: '3px solid #3B262C',
};

const randomizerStyle: React.CSSProperties = {
  width: '100%',
  height: 75,
  borderRadius: 6,
  //   border: '3px solid #3B262C',
};

const joinCreateStyle: React.CSSProperties = {
  width: '100%',
  height: 350,
  borderRadius: 6,
  border: '3px solid #3B262C',
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  height: 50
}

const Homepage: React.FC = () => {

  const [randomName, setRandomName] = useState('')
  const [justify, setJustify] = useState<FlexProps['justify']>('space-evenly');
  const [alignItems, setAlignItems] = useState<FlexProps['align']>('flex-start');

  // --------------------[HANDLERS]--------------------

  const handleRandomizeName = () => {
    axios.get('/name-randomizer')
      .then((res) => {
        setRandomName(res.data);
      })
  }

  useEffect(() => {
    handleRandomizeName();
  }, [])

  return (
    <Flex>
      <Flex style={largeStyle} justify="center" align={alignItems}>
        <Col>
          <Row>
            <h1>Welcome to Crooked Curators!</h1>
          </Row>
          <Row gutter={15}>
            <Flex style={randomizerStyle} justify="center" align="center">
              <Col>
                <Card
                  style={{ width: 250, height: 50, textAlign: "center" }}
                  size="small"
                >
                  <h2 style={{
                    fontSize: "15px",
                    marginTop: "1px"
                  }}>
                    {randomName}
                  </h2>
                </Card>
              </Col>
              <Col>
                <Button onClick={handleRandomizeName}>
                  <ReloadOutlined />
                </Button>
              </Col>
            </Flex>
          </Row>
          <Row>
            <Flex style={joinCreateStyle} justify="center" align="center">
              <Col>
                <Row>
                  <CreateGameButton />
                </Row>
                <Row>
                  <JoinGameButton />
                </Row>
                <p />
                <Row>
                  <Space.Compact style={{ width: '100%' }}>
                    <Input defaultValue="Game Code" disabled/>
                    <Button href="/game">
                      <FaArrowCircleRight />
                    </Button>
                  </Space.Compact>
                </Row>
              </Col>
            </Flex>
          </Row>
        </Col>
      </Flex>
    </Flex>
  )
}

export default Homepage;
