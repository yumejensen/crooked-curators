// Displays 3 random ribbons pulled from the database. One blue, one red, one white.

import React from 'react';
import { useState } from 'react';

import {
  Flex,
  FlexProps,
} from '../antdComponents'

const ribbonsStyle: React.CSSProperties = {
  width: '100%',
  height: 300,
  // height: '100%',
  borderRadius: 6,
};

const JudgingRibbons: React.FC = (props) => {

  // --------------------[STATES]---------------------

  // flex justify
  const [justify, setJustify] = useState<FlexProps['justify']>('space-evenly');
  const [alignItems, setAlignItems] = useState<FlexProps['align']>('center');

  // --------------------[RENDER]---------------------

  return (
    <>
      <Flex gap="middle" align="center" vertical>
        <Flex style={ribbonsStyle} justify={justify} align={alignItems}>
          Judging Ribbons go here
        </Flex>
      </Flex>
    </>
  )
}

export default JudgingRibbons;
