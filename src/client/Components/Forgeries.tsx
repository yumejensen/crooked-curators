// Displays all artworks as forgeries

import React from 'react';
import { useState } from 'react';

import { useDroppable } from '@dnd-kit/core';

import Artwork from './Artwork';

import {
  Flex,
  FlexProps,
} from '../antdComponents'

import { Ribbon as RibbonType, Artwork as ArtworkTypes } from './types'

const ribbonsStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  // height: '100%',
  borderRadius: 6,
};

type ArtworkStatusProps = {
  status: RibbonType;
  artworks: ArtworkTypes[];
}

export function Forgeries({ status, artworks }: ArtworkStatusProps) {

  // -------------------[HANDLERS]--------------------

  const { setNodeRef } = useDroppable({
    id: status.id
  })

  // --------------------[RENDER]---------------------

  return (
    <>
      <div ref={setNodeRef}>
        <Flex gap="middle" align="center" vertical >
          <Flex style={ribbonsStyle} justify='space-evenly' align='center' wrap>
            {artworks.map(artwork => {
              return (
                <Artwork key={artwork.id} artwork={artwork} size={{ width: 350 }}/>
              )
            })}
          </Flex>
        </Flex>
      </div>
    </>
  )
};

export default Forgeries;
