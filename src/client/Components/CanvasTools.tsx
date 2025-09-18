// Tools for the canvas, such as undo, redo, brush, eraser, etc

import React from 'react';

// COMPONENTS


const CanvasTools: React.FC = (props) => {

  const { tool, setTool } = props;

  // --------------------[HELPERS]--------------------

  const handleChange = (e) => {
    const { value } = e.target;
    setTool(value);
  }

  // --------------------[RENDER]---------------------

  return(
    <select
      value={tool}
      onChange={handleChange}
    >
      <option value="pen">Pen</option>
      <option value="eraser">Eraser</option>
    </select>
    )
}

export default CanvasTools;
