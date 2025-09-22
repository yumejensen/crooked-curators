// Tools for the canvas, such as undo, redo, brush, eraser, etc

import React from 'react';
import { useState } from 'react';

// ui
import { Col, Row } from '../antdComponents';
import { Button } from '../antdComponents'

// icons
import { IoArrowUndoSharp, IoArrowRedoSharp } from "react-icons/io5";
import { FaPenNib, FaEraser } from 'react-icons/fa';

// COMPONENTS
import CanvasColorPicker from './ColorPicker';

const CanvasTools: React.FC = (props) => {

  const {
    tool,
    setTool,
    handleUndo,
    handleRedo,
    changeColor
  } = props;

  // --------------------[STATES]---------------------

  const [penSelected, setPenSelected] = useState("solid");
  const [eraserSelected, setEraserSelected] = useState("dashed")

  // --------------------[HELPERS]--------------------

  const handlePen = () => {
    setTool("pen")

    setPenSelected("solid")
    setEraserSelected("dashed")
  }

  const handleEraser = () => {
    setTool("eraser")
    setEraserSelected("solid")
    setPenSelected("dashed")
  }

  // --------------------[RENDER]---------------------

  return(
    <Col>
      <Row>
        <Button onClick={handleUndo}>
          <IoArrowUndoSharp />
        </Button>
      </Row>
      <p />
      <Row>
        <Button onClick={handleRedo}>
          <IoArrowRedoSharp />
        </Button>
      </Row>
      <p />
      <Row>
        <Button
          color="default"
          variant={penSelected}
          onClick={handlePen}
        >
          <FaPenNib />
        </Button>
      </Row>
      <p />
      <Row>
        <Button
          color="default"
          variant={eraserSelected}
          onClick={handleEraser}
        >
          <FaEraser />
        </Button>
      </Row>
      <br />
      <br />
      <Row>
        <CanvasColorPicker changeColor={changeColor} />
      </Row>
    </Col>
    )
}

export default CanvasTools;
