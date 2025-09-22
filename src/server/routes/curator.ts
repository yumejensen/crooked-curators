import { Router } from 'express'
import axios from 'axios'
const {HARVARD_API_KEY} = process.env;

const curatorRouter = Router()

let query = 'Starry Night'

curatorRouter.get('/:title', (req, res)=>{
  console.log(req.params)
  query = req.params.title
  axios.get(`https://api.harvardartmuseums.org/object?apikey=${HARVARD_API_KEY}&hasimage=1&title=${query}&sortorder=desc`)
    .then(({ data })=>{
      //transform the data from the api into something useful for the game
      const { records } = data
      let pieces = records.map((record)=>{
        const piece = {
          title: record.title,
          description: record.description,
          image: '' // sometimes the api returns a piece with no image attached
        }
        if(record.images.length > 0){
          piece.image = record.images[0].baseimageurl
        }
        return piece
      })
      // remove pieces without images and shuffle the results
      pieces = pieces.filter(({ image }) => (image ? true : false)).sort(()=> 0.5 - Math.random())
      //TODO - handle no results
      // get four random pieces and send them to curator
        let selection = pieces.slice(0, 4)
        res.send(selection)
    },
  (err)=>{
    res.sendStatus(500)
    console.error(err)
  })
})

export { curatorRouter }