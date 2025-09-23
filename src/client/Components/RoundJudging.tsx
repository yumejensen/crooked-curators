// At the end of a round, all artworks are displayed here for judging

import React from 'react';
import { useState } from 'react';

import JudgingRibbons from './JudgingRibbons';
import Artwork from './Artwork'

import ribbonImages from '../../assets/ribbon-images/ribbonImages.json'

import {
  Divider,
  Col,
  Row,
  Flex,
  FlexProps,
  Segmented
} from 'antd';

const ribbonsStyle: React.CSSProperties = {
  width: '100%',
  //height: 550,
  height: '100%',
  borderRadius: 6,
};

const artworksStyle: React.CSSProperties = {
  width: '100%',
  //height: 550,
  height: '100%',
  borderRadius: 6,
};

const fakeArtworks = [
  "https://cdnb.artstation.com/p/assets/images/images/069/944/967/large/brigid-whelan-13.jpg?1701365485",
  "https://cdnb.artstation.com/p/assets/images/images/074/989/221/original/s-norris-bracken-lurk.gif?1713454142",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyJvc2XslFHwcs2lV3EfqW0aOfLUify1cXcA&s",
  "https://i.pinimg.com/736x/2f/e0/ef/2fe0efebfb8bee8a2d6e22689e2baf5b.jpg",
  "https://cdna.artstation.com/p/assets/images/images/069/944/924/large/brigid-whelan-05.jpg?1701365422",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrC8lQyW352uBDaumGVLgobnGrGt1ZIMOoKQ&s",
  "https://pbs.twimg.com/media/G0lht5cWsAEE4eu.jpg",
  "https://cdnb.artstation.com/p/assets/images/images/050/783/673/large/wong-le-yi-grace-image-6487327-1.jpg?1655700516&dl=1",
  "https://i.ytimg.com/vi/5U_NQmpFOtI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBhJ8HuHgfqisDRHkV-LOyNU-nZAw",
  "https://external-preview.redd.it/astarion-in-gartic-phone-by-me-v0-YXJ5OHU1b2ZhZWFkMcEFozTq7n1vsj0ZWIvKWj9_7TGytSR9FnVHV7IroSSq.png?format=pjpg&auto=webp&s=d40c828d8f5fffc71ae9629201991031a0a0ecf6"
]

const RoundJudging: React.FC = (props) => {

  // destructure props

  const [ribbons, setRibbons] = useState([]);
  const [roundArtworks, setRoundArtworks] = useState(fakeArtworks);

  const [justify, setJustify] = useState<FlexProps['justify']>('space-evenly');
  const [alignItems, setAlignItems] = useState<FlexProps['align']>('center');

  // fetching the round's artwork

  return (
    <>
      <Flex gap="middle" align="center" vertical>
        <Flex style={ribbonsStyle} justify={justify} align={alignItems}>
          <JudgingRibbons setRibbons={setRibbons}/>
        </Flex>
      </Flex>
      <Flex gap="middle" align="center" vertical>
        <Flex wrap style={ribbonsStyle} justify={justify} align={alignItems}>
          {roundArtworks.map((artwork) => {
            return (
              <Artwork image={artwork} size='600px'/>
            );
          })}
        </Flex>
      </Flex>
    </>
  )
}

export default RoundJudging;
