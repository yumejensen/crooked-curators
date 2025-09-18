// The Active Game View that holds that canvas and reference image

import React from 'react';

import { Layout } from 'antd';

import { Card, Col, Row } from 'antd';

// COMPONENTS
import Canvas from '../Components/Canvas';


const ActiveGame: React.FC = () => {


    return(
    
      <Row gutter={2}>
        <Col span={5}>
          <Card title="Col 1" variant="borderless">
            Card content
          </Card>
        </Col>
        <Col span={14}>
          <Card title="Col 2" variant="borderless">
            <Canvas />
          </Card>
        </Col>
        <Col span={5}>
          <Card title="Col 3" variant="borderless">
            Card content
          </Card>
        </Col>
      </Row>
      
    )
}

export default ActiveGame;

            // <Sider style={{ background: 'blue' }} width={200}>
            //     <Menu
            //     mode="inline"
            //     defaultSelectedKeys={['1']}
            //     defaultOpenKeys={['sub1']}
            //     style={{ height: '100%' }}
            //     items={items2}
            //     />              
            // </Sider>