// iterable component that renders only one artwork

import React from "react";
import { useState } from 'react';

import { Artwork as ArtworkTypes } from './types'
import { useDraggable } from "@dnd-kit/core";

type ArtworkCardProps = {
  artwork: ArtworkTypes;
}

const Artwork: React.FC = ({artwork}: ArtworkCardProps) => {

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: artwork.id
  })

  const style = transform ? {
    transform: `translate(${transform.x}px, ${transform.y}px)`
  } : undefined

  // destructure props

  return (
    <>
    <div 
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      <img
        src={artwork.source}
        style={{ width: 350}}
      />
    </div>
    </>
  );
}

export default Artwork;
