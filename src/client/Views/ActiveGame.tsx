// The Active Game View that holds that canvas and reference image

import React from 'react';
import { useState } from 'react';

import {
  Card, Col, Row, Flex, FlexProps, Splitter, Typography, Collapse
} from '../antdComponents';

// COMPONENTS
import Canvas from '../Components/Canvas';
import Reference from '../Components/Reference';
import ToJudging from '../Components/ToJudging';

const ActiveGame: React.FC = () => {

  // --------------------[STATES]---------------------
  const [playerCount, setPlayerCount] = useState(1);
  const [done, setDone] = useState(0);

  const [justify, setJustify] = useState<FlexProps['justify']>('space-evenly');
  const [alignItems, setAlignItems] = useState<FlexProps['align']>('center');

  // -------------------[HANDLERS]--------------------

  const handleDone = () => {
    setDone(done + 1);
  }

  // --------------------[RENDER]---------------------

  return (
    <>
      <Row gutter={2}>
        <Col span={3}>
          <Card>
            Card content
          </Card>
        </Col>
        <Col span={18}>
          <Card >
            <Flex gap="middle" align="center" vertical>
              <Flex
                style={{width: 500}}
                justify={justify}
                align={alignItems}
              >
                <Reference />
              </Flex>
            </Flex>
            <Canvas handleDone={handleDone} />
          </Card>
        </Col>

        <Col span={3}>
          <Card >
            <ToJudging done={done} playerCount={playerCount} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ActiveGame;
