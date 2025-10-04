// At the end of a round, all artworks are displayed here for judging

import React, { useEffect } from 'react';
import { useState } from 'react';

import { Artwork as ArtworkTypes, Ribbon as RibbonTypes } from './types';

// -------------------[COMPONENTS]------------------
import Ribbon from './Ribbon';
import Artwork from './Artwork';
import Forgeries from './Forgeries';

import {
  Divider,
  Col,
  Row,
  Flex,
  FlexProps,
  Segmented,
  Button,
  Tooltip
} from '../antdComponents';

import { DndContext, DragEndEvent } from '@dnd-kit/core';
import axios from 'axios';

const ribbonsStyle: React.CSSProperties = {
  width: '100%',
  //height: 550,
  height: '100%',
  borderRadius: 6,
};

const artworksStyle: React.CSSProperties = {
  width: '100%',
  //height: 550,
  height: '100%',
  borderRadius: 6,
};

const RIBBONS: RibbonTypes[] =[
  {
    id: 'BLUE',
    title: 'Blue Ribbon',
    points: 100,
    //source: ribbonImages.blueRibbons[0]
  },
  {
    id: 'WHITE',
    title: 'White Ribbon',
    points: 50,
    //source: ribbonImages.whiteRibbons[0]
  },
  {
    id: 'RED',
    title: 'Red Ribbon',
    points: 25,
    //source: ribbonImages.redRibbons[0]
  },
]

const STATUS = [
  {
    id: 'FORGERIES',
    title: 'Forgeries',
    points: 0
  },
]

type RoundJudgingProps = {
  artworks: [];
  setArtworks: () => void;
};

const RoundJudging: React.FC = ({ artworks, setArtworks }: RoundJudgingProps) => {

  console.log(artworks);

  // --------------------[STATES]---------------------

  const [ribbons, setRibbons] = useState([]);

  // -------------------[HANDLERS]--------------------

  // fetching the round's artwork

  // tracking dragging
  const handleDragEnd = (e: DragEndEvent) => {

    const { active, over } = e;

    if (!over) return;

    const artworkId = active.id as string;
    const newStatus = over.id as ArtworkTypes['status'];

    setArtworks(() => artworks.map(artwork => artwork.id === artworkId ? { ...artwork, status: newStatus} : artwork))
  }

  // getting ribbons for the round
  const getRibbons = () => {
    axios.get('/ribbons')
      .then(({data}) => {
        setRibbons(data);
      })
      .catch((err) => {
        console.error('Failed to GET ribbons: CLIENT:', err);
      })
  }

  useEffect(() => {
    getRibbons();
  }, [])

  // --------------------[RENDER]---------------------

  return (
    <>
    <Flex gap="middle" align="center" vertical>
      <Flex style={ribbonsStyle} justify='space-evenly' align='center'>

      </Flex>
    </Flex>
    <DndContext onDragEnd={handleDragEnd}>
      <Flex gap="middle" align="center" vertical>
        <Flex style={ribbonsStyle} justify='space-evenly' align='center'>
          {ribbons.map((ribbon) => {
            return (
              <Ribbon
                key={ribbon.id}
                ribbon={ribbon}
                artworks={artworks.filter(artwork => artwork.status === ribbon.id)} />
            )
          })}
        </Flex>
      </Flex>
      <Divider variant="dotted" style={{ borderColor: '#3B262C' }}>
        Forgeries
      </Divider>
      <Flex gap="middle" align="center" vertical>
        <Flex wrap style={ribbonsStyle} justify='space-evenly' align='center'>
          {STATUS.map((status) => {
            return (
              <Forgeries
                key={status.id}
                status={status}
                artworks={artworks.filter(artwork => artwork.status === status.id)} />
            )
          })}
        </Flex>
      </Flex>
    </DndContext>
    </>
  )
}

export default RoundJudging;
