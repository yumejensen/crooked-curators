// The Active Game View that holds that canvas and reference image

import React from 'react';
import { useState } from 'react';

import { useGameContext } from '../context';

import {
  Col, Row, Flex
} from '../antdComponents';

// COMPONENTS
import Canvas from '../Components/Canvas';
import Reference from '../Components/Reference';
import ArtSubmitCount from '../Components/ArtSubmitCount';

type ActiveGameProps = {
  handleArtworks: () => void;
};

const ActiveGame: React.FC = () => {

  // --------------------[STATES]---------------------

  // const [playerCount, setPlayerCount] = useState(1);
  // const [done, setDone] = useState(0);

  const { doneCount, players } = useGameContext().game;


  // --------------------[RENDER]---------------------

  return (
    <>
      <Row gutter={2}>
        <Col span={3}>
         
        </Col>
        <Col span={18}>

            <Flex gap="middle" align="center" vertical>
              <Flex
                style={{width: 500}}
                justify='space-evenly'
                align='center'
              >
                <Reference />
              </Flex>
            </Flex>
            <Canvas />

        </Col>

        <Col span={3}>

            <ArtSubmitCount />

        </Col>
      </Row>
    </>
  );
};

export default ActiveGame;
