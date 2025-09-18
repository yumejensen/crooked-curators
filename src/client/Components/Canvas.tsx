// Canvas for artists to draw on during the game

import React from 'react';
import { useState } from 'react';
import {
  Divider,
  Col,
  Row,
  Flex,
  FlexProps,
  Segmented
} from 'antd';

import { Stage, Layer, Line, Text } from 'react-konva';

// -------------------[COMPONENTS]------------------
import CanvasTools from './CanvasTools';
import CanvasColorPicker from './ColorPicker';

const boxStyle: React.CSSProperties = {
  width: '100%',
  height: 550,
  borderRadius: 6,
  border: '3px solid #3B262C',
};

// const justifyOptions = [
//   'flex-start',
//   'center',
//   'flex-end',
//   'space-between',
//   'space-around',
//   'space-evenly',
// ];

// const alignOptions = ['flex-start', 'center', 'flex-end'];

const Canvas = () => {

  // --------------------[STATES]---------------------

  const [tool, setTool] = React.useState('pen');
  const [lines, setLines] = React.useState([]);

  const [justify, setJustify] = useState<FlexProps['justify']>('space-evenly');
  const [alignItems, setAlignItems] = useState<FlexProps['align']>('center');

  const isDrawing = React.useRef(false);

  // --------------------[HELPERS]--------------------

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  // --------------------[RENDER]---------------------

  return (
    <div>
      <Divider variant="dotted" style={{ borderColor: '#3B262C' }}>
        Canvas
      </Divider>
      <Flex gap="middle" align="center" vertical>
        <Flex style={boxStyle} justify={justify} align={alignItems}>
          <CanvasTools tool={tool} setTool={setTool} />
          <Stage
            width={900}
            height={500}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          >
            <Layer>
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke="#df4b26"
                  strokeWidth={5}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation={
                    line.tool === 'eraser' ? 'destination-out' : 'source-over'
                  }
                />
              ))}
            </Layer>
          </Stage>
          <CanvasColorPicker />
        </Flex>
      </Flex>
    </div>
  );
};

export default Canvas;
