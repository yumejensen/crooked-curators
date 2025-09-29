import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row, Button, Tooltip } from '../antdComponents';

const ToJudging = (props) => {

  const { done, playerCount, isCurator } = props;

  // --------------------[RENDER]---------------------

  if(done === playerCount){

    return (
      <Link to='/judging' >
        <Button>
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
