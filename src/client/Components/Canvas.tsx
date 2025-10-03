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

import { useGameContext } from '../context';

import { Stage, Layer, Line, Text, Rect } from 'react-konva';

// -------------------[COMPONENTS]------------------
import CanvasTools from './CanvasTools';
import SubmitArtwork from './SubmitArtwork';
import GameCodeJoin from './GameCodeJoin';


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

const Canvas = (props) => {

  const { handleDone } = props

  const { code } = useGameContext().game;

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

    const uri = stageRef.current.toDataURL();

    // make request to server to send the URI to our cloud storage
    axios.get('/s3Url').then((res) => {

      imageUrl = res.data.split('?')[0];

      console.log('Successful GET request to s3Url: CLIENT');

      // make PUT request to the s3 bucket with url from request
      axios.put(res.data, {
          'Content-Type': "image/png",
          body: uri
        }).then(() => {

          console.log('Successful PUT request to s3Url: CLIENT:');

          // image Url needs to be saved to the artwork
          // to get the image, a request must be made to the
          // link and accessed by link.body (or whatever variable name is)
          setImage(uri);
          console.log(imageUrl);

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

  const handleSubmitImage = () => {

    // later sets to the link provided from the S3 request to have accessible in outer scope
    let imageUrl = '';

    // converts canvas image to a URI to save to the S3 bucket
    const uri = stageRef.current.toDataURL();

    // make request to server to send the URI to our cloud storage
    axios.get('/s3Url').then((res) => {

      imageUrl = res.data.split('?')[0];

      console.log('Successful GET request to s3Url: CLIENT');

      // make PUT request to the s3 bucket with url from request
      axios.put(res.data, {
          'Content-Type': "image/png",
          body: uri
        }).then(() => {

          console.log('Successful PUT request to s3Url: CLIENT:');

          // image Url needs to be saved to the artwork
          // to get the image, a request must be made to the
          // link and accessed by link.body (or whatever variable name is)
          console.log(imageUrl);

          axios.post('/artworks', {
            gameCode: code,
            imageUrl: imageUrl
          }).then(() => {
            console.log('Successfully posted artwork URL to server: CLIENT')

          }).catch((err) => {
            console.error('Failed to post artwork URL to server: CLIENT:', err);
          })

      }).catch((err) => {
        console.error('Failed PUT request to s3 bucket: CLIENT:', err);
      })

    }).catch((err) => {
      console.error('Failed GET request to s3Url: CLIENT:', err);
    })
  }

  // --------------------[RENDER]---------------------

  return (
    <div>
      <Divider variant="dotted" style={{ borderColor: '#3B262C' }}>
        Canvas
      </Divider>
      <Flex gap="middle" align="center" vertical>
        <Flex style={boxStyle} justify='space-evenly' align='center'>
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
          <SubmitArtwork handleSubmitImage={handleSubmitImage} handleDone={handleDone}/>
        </Flex>
      </Flex>
    </div>
  );
};

export default Canvas;
