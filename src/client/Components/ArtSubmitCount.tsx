import React from 'react';
import { useGameContext} from '../context';

import ToJudging from './ToJudging';

const ArtSubmitCount:React.FC = () => {

  const { doneCount, players, role } = useGameContext().game;

  if (role === "artist"){
    return (
      <h3> Submitted: {doneCount}/{players.length - 1} </h3>
    )
  }

  return (
    <>
      <h3> Submitted: {doneCount}/{players.length - 1} </h3>
      <ToJudging />
    </>
  )
}

export default ArtSubmitCount;
