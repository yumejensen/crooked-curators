// The Active Game View that holds that canvas and reference image

import React from 'react';

import {
  Card, Col, Row, Flex, Splitter, Typography, Collapse
} from '../antdComponents';

// COMPONENTS
import Canvas from '../Components/Canvas';
import Reference from '../Components/Reference';


const ActiveGame: React.FC = () => {
    return(
    
      <Row gutter={2}>
        <Col span={3}>
          <Card title="Col 1" variant="borderless">
            Card content
          </Card>
        </Col>
        <Col span={18}>
          <Card title="Col 2" variant="borderless">
            <Reference />
            <Canvas />
          </Card>
        </Col>
        <Col span={3}>
          <Card title="Col 3" variant="borderless">
            Card content
          </Card>
        </Col>
      </Row>
      
    )
}

export default ActiveGame;
