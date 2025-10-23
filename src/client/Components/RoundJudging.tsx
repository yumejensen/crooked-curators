// At the end of a round, all artworks are displayed here for judging

import React, { useEffect } from 'react';
import { useGameContext, useSocketContext } from '../context';

import {
  Divider,
  Flex,
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

const RoundJudging: React.FC = () => {

  // -------------------[CONTEXT]---------------------

  const { ribbons, playerArtworks, curator } = useGameContext().game;
  const { setGame } = useGameContext();
  const { socket } = useSocketContext();
 
  
  // -------------------[HANDLERS]--------------------


  // handles changing artwork's status upon dropping it in a container
  const handleDragEnd = (e: DragEndEvent) => {

    const { active, over } = e;

    if (!over) return;

    // grabs artwork's id for reference to change
    const artworkId = active.id as string;
    // grabs the STATUS/RIBBON color for dropped column
    const newStatus = over.id as ArtworkTypes['status'];


    // function that updates the artwork status with RED, WHITE, or BLUE
    const mapArtworks = () => {
      // update the status of the artwork for drag
      return playerArtworks.map(artwork => artwork.id === artworkId ? { ...artwork, status: newStatus } : artwork)
    }
    
    const mapArtString = mapArtworks.toString() // this is prob useless lol

    // update the game context with artwork status everytime there's a drop
    setGame((oldGame) => {
      // emit to socket every time there's a drag 
      
      // update the game context
      return {...oldGame, playerArtworks: mapArtworks()}
    });
    
    socket?.emit('dragArtwork', mapArtworks(), curator);

    console.log('player artworks array from round judge:', playerArtworks);
  }


 
  // --------------------[RENDER]---------------------

  return (
    <>
      <Flex gap="middle" align="center" vertical>
        <Flex style={ribbonsStyle} justify='space-evenly' align='center'>
          <LockInJudging />
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
                  artworks={playerArtworks.filter(artwork => artwork.status === ribbon.color)} 
                />
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
                  artworks={playerArtworks.filter(artwork => artwork.status === status.color)} />
              )
            })}
          </Flex>
        </Flex>
      </DndContext>
    </>
  )
}

export default RoundJudging;
