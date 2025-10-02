import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const SwitchView: React.FC = () => {
  
  if (startGame){
    return <Navigate to={'/game'} />
  }

};

export default SwitchView;