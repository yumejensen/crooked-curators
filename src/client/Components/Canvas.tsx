// Canvas for artists to draw on during the game

import React from 'react';
import { useState, useEffect, useRef } from 'react';
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
  //height: 550,
  height: '100%',
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
  // let sceneWidth = 800;
  // let sceneHeight = 500;
  
  // // current scale + dimensions
  // const [stageSize, setStageSize] = useState({
  //   width: sceneWidth,
  //   height: sceneHeight,
  //   scale: 1
  // });
  const containerRef = useRef(null);

  const [tool, setTool] = React.useState('pen');
  const [lines, setLines] = React.useState([]);
  const [lineColor, setLineColor] = React.useState("#df4b26");

  const [justify, setJustify] = useState<FlexProps['justify']>('space-evenly');
  const [alignItems, setAlignItems] = useState<FlexProps['align']>('center');

  const isDrawing = React.useRef(false);

  // --------------------[HELPERS]--------------------

  // const updateSize = () => {
  //   if (!containerRef.current) return;
    
  //   // Get container width
  //   const containerWidth = containerRef.current.offsetWidth;
    
  //   // Calculate scale
  //   const scale = containerWidth / sceneWidth;
    
  //   // Update state with new dimensions
  //   setStageSize({
  //     width: sceneWidth * scale,
  //     height: sceneHeight * scale,
  //     scale: scale
  //   });
  // };
  
  // // Update on mount and when window resizes
  // useEffect(() => {
  //   updateSize();
  //   window.addEventListener('resize', updateSize);
    
  //   return () => {
  //     window.removeEventListener('resize', updateSize);
  //   };
  // }, []);


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

//   function fitStageIntoParentContainer() {
//     // Get the container element
//     const container = document.getElementById('canvasBorder');
//     // Make the container take up the full width
//     container.style.width = '100%';
//     // Get current container width
//     const containerWidth = container.offsetWidth;
//     // Calculate scale based on virtual width vs actual width
//     const scale = containerWidth / sceneWidth;
    
//     // Set stage dimensions and scale
//     stage.width(sceneWidth * scale);
//     stage.height(sceneHeight * scale);
//     stage.scale({ x: scale, y: scale });
// }

  // --------------------[RENDER]---------------------

  return (
    <div>
      <Divider variant="dotted" style={{ borderColor: '#3B262C' }}>
        Canvas
      </Divider>
      <Flex gap="middle" align="center" vertical>
        <Flex style={boxStyle} justify={justify} align={alignItems}>
          <CanvasTools tool={tool} setTool={setTool} />
          <div ref={containerRef} style={boxStyle}>
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
                  stroke={lineColor}
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
          </div>
          <CanvasColorPicker changeColor={setLineColor} />
        </Flex>
      </Flex>
    </div>
  );
};

export default Canvas;
