// Canvas for artists to draw on during the game

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import {
  Divider,
  Col,
  Row,
  Flex,
  FlexProps,
  Segmented
} from '../antdComponents';

import { Stage, Layer, Line, Text, Rect } from 'react-konva';

// -------------------[COMPONENTS]------------------
import CanvasTools from './CanvasTools';


const boxStyle: React.CSSProperties = {
  width: '100%',
  //height: 550,
  height: '100%',
  borderRadius: 6,
};

const canvasBoxStyle: React.CSSProperties = {
  width: '100%',
  //height: 550,
  height: '100%',
  borderRadius: 6,
  border: '3px solid #3B262C',
};

const Canvas = () => {

  // --------------------[STATES]---------------------

  // reference to canvas container
  const containerRef = useRef(null);

  // State to track current scale and dimensions
  // const [stageSize, setStageSize] = useState({
  //   width: sceneWidth,
  //   height: sceneHeight,
  //   scale: 1
  // });

  // lines
  const [lines, setLines] = React.useState([]);

  // tools
  const [tool, setTool] = React.useState('pen');
  const [lineColor, setLineColor] = React.useState("#000000");

  // flex justify
  const [justify, setJustify] = useState<FlexProps['justify']>('space-evenly');
  const [alignItems, setAlignItems] = useState<FlexProps['align']>('center');

  // history
  const [history, setHistory] = useState([])

  // export
  const stageRef = React.useRef(null);

  const [image, setImage] = useState('');

  // -------------------[HANDLERS]--------------------

  const isDrawing = React.useRef(false);

  // Define virtual size for our scene

  // const sceneWidth = 900;
  // const sceneHeight = 500;


  // Function to handle resize

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


  // Update on mount and when window resizes

  // useEffect(() => {
  //   updateSize();
  //   window.addEventListener('resize', updateSize);

  //   return () => {
  //     window.removeEventListener('resize', updateSize);
  //   };
  // }, []);

  // drawing
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

  // undo and redo
  const handleUndo = () => {

    // remove last line
    let lastLine = lines.pop();

    // update state without the last line & add last line to history
    setLines([...lines]);
    setHistory([...history, lastLine])
  };

  const handleRedo = () => {

    if (history.length !== 0) {

      // remove last line from the history
      let lastLine = history.pop()

      // update history without the last line
      setHistory([...history]);

      // add last line back to lines
      if (lines.length === 0) {
        setLines([...lastLine]);
      } else {
        setLines([...lines, lastLine]);
      }
    }
  };

  // export to pull image from canvas
  const handleSaveToProfile = () => {

    
    let imageUrl = '';

    function dataURLtoFile(dataurl: string, filename: string) {
      let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      console.log(mime)
      return new File([u8arr], filename, { type: mime });
    }

    // no file type
    const uri = stageRef.current.toDataURL();
    // no file type
    const imageFile = dataURLtoFile(uri, 'artwork.png');
    // no file type
    const imageStage = stageRef.current;

    // make request to server to send the URI to our cloud storage
    axios.get('/s3Url').then((res) => {

      console.log(res.data)
      imageUrl = res.data.split('?')[0];

      console.log('Successful GET request to s3Url: CLIENT');

      // make PUT request to the s3 bucket with url from request
      axios.put(res.data, {
          body: uri
        },
        {
          headers: {
            "Content-Type": "image/png"
        },
      }).then((res) => {

        console.log('Successful PUT request to s3Url: CLIENT:');
        console.log(imageUrl);
        setImage(imageUrl);

      }).catch((err) => {
        console.error('Failed PUT request to s3 bucket: CLIENT:', err);
      })

    }).catch((err) => {
      console.error('Failed GET request to s3Url: CLIENT:', err);
    })
  };

  const handleDownload = () => {

    const uri = stageRef.current.toDataURL('image/png');

    function downloadURI(uri, name) {
      var link = document.createElement('a');
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    downloadURI(uri, 'artwork.png');
  };

  // --------------------[RENDER]---------------------

  return (
    <div>
      <img src={image} />
      <Divider variant="dotted" style={{ borderColor: '#3B262C' }}>
        Canvas
      </Divider>
      <Flex gap="middle" align="center" vertical>
        <Flex style={boxStyle} justify={justify} align={alignItems}>
          <CanvasTools
            changeColor={setLineColor}
            tool={tool}
            setTool={setTool}
            handleUndo={handleUndo}
            handleRedo={handleRedo}
            handleSave={handleSaveToProfile}
            handleDownload={handleDownload}
          />
          <div ref={containerRef} style={canvasBoxStyle}>
            <Stage
              width={900}
              height={500}
              ref={stageRef}
              onMouseDown={handleMouseDown}
              onMousemove={handleMouseMove}
              onMouseup={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
            >
              <Layer>
                <Rect x={0} y={0} width={900} height={500} fill="white" />
              </Layer>
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
          </div>
        </Flex>
      </Flex>
    </div>
  );
};

export default Canvas;
