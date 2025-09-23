// iterable component that renders only one artwork

import React from "react";
import { useState } from 'react';

const Artwork: React.FC = (props) => {

  // destructure props
  const { image, size } = props;

  return (
    <>
      <img
        src={image}
        style={{ width: size}}
      />
    </>
  );
}

export default Artwork;
