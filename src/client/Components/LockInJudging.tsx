// Button to lock in judging for ribbons
// Conditionally renders if too many artworks are assigned per ribbon

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSocketContext } from '../context';
import axios from 'axios';

import { Button } from '../antdComponents';

// ---------------------[TYPES]---------------------

import { LockInJudging as LockInJudgingProps } from './types';

// -------------------[COMPONENT]-------------------

const LockInJudging = ({ artworks }: LockInJudgingProps) => {

  // --------------[STATES + CONTEXT]---------------------

  const [lockInReady, setLockInReady] = useState(false);

  const { socket } = useSocketContext();

  // -------------------[HANDLERS]--------------------

  // locking in the judging to add ribbons to winning artworks in the DB
  const handleLockIn = () => {

    // make request to update each of the artworks' entries in the DB to have the ribbon referenced by ribbon_id
    axios.patch('/artworks', {

      // include artwork id and ribbon id

    })
    .then(() => {
      // will a then block be needed?
      console.log('Successfully PATCHed artwork with winning Ribbon')
    })
    .catch((err) => {
      console.error('Failed to PATCH artwork with winning Ribbon: CLIENT')
    })
  }

  // trigger the next round
  const triggerNextRound = () => {
    socket?.emit('newRound')
  }

  // -------------------[LIFECYCLE]-------------------

  useEffect(() => {

    // check to make sure that the amount of artworks in each column is exactly one
    const toUpdate = artworks.map((artwork) => {
      return artwork.status === 'BLUE' || artwork.status === 'WHITE' || artwork.status === 'RED';
    })

    let blueRibbonArts = 0;
    let redRibbonArts = 0;
    let whiteRibbonArts = 0;

    toUpdate.forEach((artwork) => {
      if(artwork.status === 'BLUE'){
        blueRibbonArts++;
      } else if(artwork.status === 'WHITE'){
        redRibbonArts++;
      } else if(artwork.status === 'RED'){
        whiteRibbonArts;
      }
    });

    if(blueRibbonArts > 1 || redRibbonArts > 1 || whiteRibbonArts > 1){
      setLockInReady(false);
    } else if(blueRibbonArts === 0 && redRibbonArts === 0 && whiteRibbonArts === 0){
      setLockInReady(false);
    } else {
      setLockInReady(true);
    }
  })

  // --------------------[RENDER]---------------------

  return (
    <Button onClick={triggerNextRound}>Lock In Ribbons</Button>
  )

  // if(lockInReady === true){
  //   return (
  //     <Button>Lock In Ribbons</Button>
  //   )
  // } else {
  //   return (
  //     <Button disabled>Lock In Ribbons</Button>
  //   )
  // }
}

export default LockInJudging;
