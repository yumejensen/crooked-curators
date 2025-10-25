import React from "react";

import { Button } from "../antdComponents";

import { useSocketContext, useGameContext } from "../context";

// type ToJudgingProps = {
//   done: number;
//   playerCount: number;
//   // isCurator: boolean; // not being used atm
// };

const ToJudging = () => {
  
  const { socket } = useSocketContext();
  const { doneCount, players } = useGameContext().game;

  const handleClick = () => {
    socket?.emit("toJudging");
  };

  // --------------------[RENDER]---------------------

  
    return (
      <Button
        onClick={handleClick}
        disabled={doneCount !== players.length - 1}
      >
        Judging Time!
      </Button>
      );
}

export default ToJudging;
