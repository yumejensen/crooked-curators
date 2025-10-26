import React from 'react';
import { useGameContext} from '../context';

import ToJudging from './ToJudging';

import {
  Card
} from "../antdComponents"

const ArtSubmitCount:React.FC = () => {

  const { doneCount, players, role } = useGameContext().game;

  if (role === "artist"){
    return (
      <h3> Submitted: {doneCount}/{players.length - 1} </h3>
    )
  }

  return (
    <Card size="small">
      <h3> Works Submitted: {doneCount}/{players.length - 1} </h3>
      
      <div style={{display: doneCount === players.length - 1 ? 'block' : 'none'}}>
        <ToJudging/>
      </div>
    </Card>
  )
}

export default ArtSubmitCount;
