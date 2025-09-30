// Displays 3 random ribbons pulled from the database. One blue, one red, one white.

import React from 'react';
import { useState } from 'react';

import { useDroppable } from '@dnd-kit/core';

import Artwork from './Artwork';

import {
  Flex,
  FlexProps,
  Col,
  Row,
} from '../antdComponents'

import { Ribbon as RibbonType, Artwork as ArtworkTypes} from './types'

const ribbonsStyle: React.CSSProperties = {
  width: 450,
  height: 400,
  // height: '100%',
  borderRadius: 6,
  border: '3px solid #3B262C',
};

type RibbonProps = {
  ribbon: RibbonType;
  artworks: ArtworkTypes[];
}

export function Ribbon({ribbon, artworks}: RibbonProps) {

  console.log(artworks);

  // --------------------[STATES]---------------------

  // flex justify
  const [justify, setJustify] = useState<FlexProps['justify']>('space-evenly');
  const [alignItems, setAlignItems] = useState<FlexProps['align']>('flex-start');

  // -------------------[HANDLERS]--------------------

  const { setNodeRef } =useDroppable({
    id: ribbon.id
  })

  // --------------------[RENDER]---------------------

  return (
    <>
    <div ref={setNodeRef}>
      <Flex gap="middle" align="center" vertical>
        <Flex style={ribbonsStyle} justify={justify} align={alignItems}>
          <Col>
            <Row>
              <img src={ribbon.source} style={{ width: 100 }}/>
            </Row>
            <Row>
              {artworks.map(artwork => {
                return <Artwork key={artwork.id} artwork={artwork} />
              })}
            </Row>
          </Col>
        </Flex>
      </Flex>
    </div>
    </>
  )
};

export default Ribbon;
