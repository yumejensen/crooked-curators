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

const STATUS = [
  {
    id: 'FORGERIES',
    color: 'FORGERIES',
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

  // tracking dragging
  const handleDragEnd = (e: DragEndEvent) => {

    const { active, over } = e;

    if (!over) return;

    const artworkId = active.id as string;
    const newStatus = over.id as ArtworkTypes['status'];

    setArtworks(() => artworks.map(artwork => artwork.id === artworkId ? { ...artwork, status: newStatus } : artwork))
  }

  // getting ribbons for the round
  const getRibbons = () => {
    axios.get('/ribbons')
      .then(({ data }) => {
        setRibbons(data);
      })
      .catch((err) => {
        console.error('Failed to GET ribbons: CLIENT:', err);
      })
  }

  useEffect(() => {
    getRibbons();
  }, [])

  const handleLockIn = () => {

    // check to make sure that the amount of artworks in each column is exactly one
    const toUpdate = artworks.map((artwork) => {
      return artwork.status === 'BLUE' || artwork.status === 'WHITE' || artwork.status === 'RED';
    })

    console.log(toUpdate);

    // make request to update each of the artworks' entries in the DB to have the ribbon it won

  }

  // --------------------[RENDER]---------------------

  return (
    <>
      <Flex gap="middle" align="center" vertical>
        <Flex style={ribbonsStyle} justify='space-evenly' align='center'>
          <Button>Lock In Ribbons</Button>
        </Flex>
      </Flex>
      <DndContext onDragEnd={handleDragEnd}>
        <Flex gap="middle" align="center" vertical>
          <Flex style={ribbonsStyle} justify='space-evenly' align='center'>
            {ribbons.map((ribbon) => {
              return (
                <Ribbon
                  key={ribbon.color}
                  ribbon={ribbon}
                  artworks={artworks.filter(artwork => artwork.status === ribbon.color)} />
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
                  artworks={artworks.filter(artwork => artwork.status === status.color)} />
              )
            })}
          </Flex>
        </Flex>
      </DndContext>
    </>
  )
}

export default RoundJudging;
