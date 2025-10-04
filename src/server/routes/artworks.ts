import { Router } from 'express';

import { Game } from '../db/schemas/games';
import { Round } from '../db/schemas/rounds';
import { Artwork } from '../db/schemas/artworks';
import axios from 'axios';

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
artworkRouter.get('/:gameCode', ({ params, user }, res) => {

  // get user and game code from request
  const { gameCode } = params;

  // search db for game by code
  Game.findOne({
    where: {
      gameCode: gameCode
    }
  })
    .then((game) => {

      // grab game id and query for round with that id, filtering for most recent
      const { id } = game;

      Round.findAll({
        where: {
          game_id: id,
        },
        limit: 1,
        order: [['createdAt', 'DESC']]
      })
        .then((round) => {

          // get all artworks from that round via round id
          Artwork.findAll({
            where: {
              round_id: round[0].dataValues.id,
            },
            attributes: ['id', ['artworkSrc', 'source']]
          })
            .then(async (artworks) => {

              // map over artworks to add status of "FORGERIES" to each
              // make a request while having access to s3 link and await response, reassigning source to body: URI

              const allArtworks = await artworks.map(async ({ dataValues }) => {

                dataValues.status = 'FORGERIES';

                // make get request to each artwork's source s3 urls
                const source = dataValues.source;

                await axios.get(source)
                .then(({ data }) => {
                  dataValues.source = data.body;
                })

                return dataValues;
              });

              // send array of artwork uri's back
              Promise.all(allArtworks)
                .then((artworks) => res.json(artworks))
                .catch((err) => console.error('Failed to PROMISE ALL artwork requests: SERVER:', err))
            })
        })
        .catch((err) => {
          console.error('Failed to find Round via Game ID: SERVER:', err);
        });
    })
    .catch((err) => {
      console.error('Failed to find Game via Game Code: SERVER:', err);
    })
})
