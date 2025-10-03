import { Router } from 'express';

import { Game } from '../db/schemas/games';
import { Round } from '../db/schemas/rounds';
import { Artwork } from '../db/schemas/artworks';

export const artworkRouter = Router();

// post artworks to database by s3 get url
artworkRouter.post('/', (req: any, res) => {

  // destructure body from request
  const { body, user } = req;

  // destructure game code and image url from body
  const { gameCode, imageUrl } = body;

  // search db by game code to get the game id, then rounds with that game id
  Game.findOne({
    where: {
      gameCode: gameCode
    }
  })
    .then((game) => {

      const { id } = game;

      // find rounds by game id; sorting by most recent and limiting result to 1
      Round.findAll({
        where: {
          game_id: id,
        },
        limit: 1,
        order: [['createdAt', 'DESC']]
      })
        .then((round) => {

          // with most recent round id, add to artworks with round id, user id, and artwork url
          Artwork.create({
            createdAt: new Date(),
            updatedAt: new Date(),
            artworkSrc: imageUrl,
            round_id: round[0].dataValues.id,
            artist_id: user.id
          })

        })
        .catch((err) => {
          console.error('Failed to find Rounds with Game ID: SERVER:', err);
        });
    })
    .catch((err) => {
      console.error('Failed to find Game with Game Code, adding Artwork: SERVER:', err);
    });
})

// retrieve artwork from database
artworkRouter.get('/', (req, res) => {

  // get user and game code from request

  // search db for game by code

  // grab game id and query for round with that id, filtering for most recent

  // get all artworks from that round via round id

  // pull each artworks's source

  // make get request to each artwork's source s3 urls

  // send array of artwork uri's back

})
