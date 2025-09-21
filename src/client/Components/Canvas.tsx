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
  const [lineColor, setLineColor] = React.useState("#000000");

  const [justify, setJustify] = useState<FlexProps['justify']>('space-evenly');
  const [alignItems, setAlignItems] = useState<FlexProps['align']>('center');

  const isDrawing = React.useRef(false);

  // history
  const [history, setHistory] = useState([])

  // -------------------[HANDLERS]--------------------

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y], stroke: lineColor }]);
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

  const handleMouseUp = (e) => {
    isDrawing.current = false;
  };

  const handleUndo = () => {

    // remove last line
    let lastLine = lines.pop();

    // update state without the last line & add last line to history
    setLines([...lines]);
    setHistory([...history, lastLine])
  };

  const handleRedo = () => {

    if(history.length !== 0){

      // remove last line from the history
      let lastLine = history.pop()

      // update history without the last line
      setHistory([...history]);

      // add last line back to lines
      if(lines.length === 0){
        setLines([...lastLine]);
      } else {
        setLines([...lines, lastLine]);
      }
    }
  };

  // --------------------[RENDER]---------------------

  return (
    <div>
      <Divider variant="dotted" style={{ borderColor: '#3B262C' }}>
        Canvas
      </Divider>
      <Flex gap="middle" align="center" vertical>
        <Flex style={boxStyle} justify={justify} align={alignItems}>
          <CanvasTools
            tool={tool}
            setTool={setTool}
            handleUndo={handleUndo}
            handleRedo={handleRedo}
          />
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
                  stroke={line.stroke}
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
          <CanvasColorPicker changeColor={setLineColor} />
        </Flex>
      </Flex>
    </div>
  );
};

export default Canvas;
