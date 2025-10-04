import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row, Button, Tooltip } from '../antdComponents';

type ToJudgingProps = {
  done: number;
  playerCount: number;
  isCurator: boolean;
  socket: any;
  handleArtworks: () => void;
}

const ToJudging = ({ done, playerCount, isCurator, socket, handleArtworks }: ToJudgingProps) => {

  const nextStage = () => {
    // emit a nextStage event to server
    socket.emit('nextStage')
  }

  // call both functions on click for judging time
  const handleClick = () => {
    nextStage();
    handleArtworks();
  }

  // --------------------[RENDER]---------------------

  if(done === playerCount){

    return (
      <Link to='/judging' >
        <Button onClick={handleClick}>
          Judging Time!
        </Button>
      </Link>

    );

  } else {
    return (
      <Button disabled>
        {done} / {playerCount}
      </Button>
    )
  }

}

export default ToJudging;
