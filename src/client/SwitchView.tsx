import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { useGameContext } from './context';

const SwitchView: React.FC = ({ startGame }) => {

  const { role } = useGameContext().game;
  
  if (startGame === true){
    if (role === 'curator'){
      return <Navigate to={'/curator'} />
    }
    
    if (role === 'artist'){
      return <Navigate to={'/game'} />
    }
  }

};

export default SwitchView;