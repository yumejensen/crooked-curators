import { Router } from 'express';

import randomUsernames from '../randomUsernames.json';

const nameRandomizerRouter = Router();

// HELPER
const randomizeName = () => {

  // destructure FIRST and LAST from the json
  const { FIRST, LAST } = randomUsernames;

  // helper for random index
  const randomIndex = (length) => {
    return Math.floor(Math.random() * length);
  }

  return `${FIRST[randomIndex(FIRST.length)]} ${LAST[randomIndex(LAST.length)]}`;
}

nameRandomizerRouter.get('/',(req, res) => {
  res.send(randomizeName());
})

export { nameRandomizerRouter, randomizeName };
