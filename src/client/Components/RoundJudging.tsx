// At the end of a round, all artworks are displayed here for judging

import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

import {
  Divider,
  Col,
  Row,
  Flex,
  Button,
} from '../antdComponents';

import { DndContext, DragEndEvent } from '@dnd-kit/core';

// -------------------[COMPONENTS]------------------

import Ribbon from './Ribbon';
import Forgeries from './Forgeries';
import LockInJudging from './LockInJudging';

// ---------------------[TYPES]---------------------

import { Artwork as ArtworkTypes, Ribbon as RibbonTypes } from './types';
import { RoundJudging as RoundJudgingProps } from './types';

// ---------------------[STYLE]---------------------

const ribbonsStyle: React.CSSProperties = {
  width: '100%',
  //height: 550,
  height: '100%',
  borderRadius: 6,
};

// --------------------[STATUS]---------------------

const STATUS = [
  {
    id: 'FORGERIES',
    color: 'FORGERIES',
    title: 'Forgeries',
    points: 0
  },
]

// -------------------[COMPONENT]-------------------

const RoundJudging: React.FC = ({ artworks, setArtworks, handleArtworks }: RoundJudgingProps) => {

  // --------------------[STATES]---------------------

  const [ribbons, setRibbons] = useState([]);

  // -------------------[HANDLERS]--------------------

  // handles changing artwork's status upon dropping it in a container
  const handleDragEnd = (e: DragEndEvent) => {

    const { active, over } = e;

    if (!over) return;

    // grabs artwork's id for reference to change
    const artworkId = active.id as string;
    // grabs the STATUS/RIBBON color for dropped column
    const newStatus = over.id as ArtworkTypes['status'];

    // ignore error, this works
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

  // -------------------[LIFECYCLE]-------------------

  // pulling ribbons upon render
  useEffect(() => {
    handleArtworks();
    // needs to be added to the socket so the same ribbons are visible for everyone in the game
    getRibbons();
  }, [])

  // --------------------[RENDER]---------------------

  return (
    <>
      <Flex gap="middle" align="center" vertical>
        <Flex style={ribbonsStyle} justify='space-evenly' align='center'>
          <LockInJudging artworks={artworks} ribbons={ribbons} />
        </Flex>
      </Flex>
      <br />
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
