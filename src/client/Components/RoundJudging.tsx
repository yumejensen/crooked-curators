// At the end of a round, all artworks are displayed here for judging

import React from 'react';
import { useState } from 'react';

import { Artwork as ArtworkTypes, Ribbon as RibbonTypes } from './types';

import ribbonImages from '../../assets/ribbon-images/ribbonImages.json'

// -------------------[COMPONENTS]------------------
import Ribbon from './Ribbon';
import Artwork from './Artwork';
import Forgeries from './Forgeries';

import {
  Divider,
  Col,
  Row,
  Flex,
  FlexProps,
  Segmented
} from 'antd';

import Column from 'antd/es/table/Column';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

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

const RIBBONS: RibbonTypes[] =[
  {
    id: 'BLUE',
    title: 'Blue Ribbon',
    points: 100,
    source: ribbonImages.blueRibbons[0]
  },
  {
    id: 'RED',
    title: 'Red Ribbon',
    points: 25,
    source: ribbonImages.redRibbons[0]
  },
  {
    id: 'WHITE',
    title: 'White Ribbon',
    points: 50,
    source: ribbonImages.whiteRibbons[0]
  },

]

const STATUS = [
  {
    id: 'FORGERIES',
    title: 'Forgeries',
    points: 0
  },
]

const FAKE_ARTWORKS: ArtworkTypes[] = [
  {
    id: 'user_001',
    source: "https://cdnb.artstation.com/p/assets/images/images/069/944/967/large/brigid-whelan-13.jpg?1701365485",
    status: 'FORGERIES'
  },
  {
    id: 'user_002',
    source: "https://cdnb.artstation.com/p/assets/images/images/074/989/221/original/s-norris-bracken-lurk.gif?1713454142",
    status: 'FORGERIES'
  },
  {
    id: 'user_003',
    source: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyJvc2XslFHwcs2lV3EfqW0aOfLUify1cXcA&s",
    status: 'FORGERIES'
  },
  {
    id: 'user_004',
    source: "https://i.pinimg.com/736x/2f/e0/ef/2fe0efebfb8bee8a2d6e22689e2baf5b.jpg",
    status: 'FORGERIES'
  },
  {
    id: 'user_005',
    source: "https://cdna.artstation.com/p/assets/images/images/069/944/924/large/brigid-whelan-05.jpg?1701365422",
    status: 'FORGERIES'
  },
  {
    id: 'user_006',
    source: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrC8lQyW352uBDaumGVLgobnGrGt1ZIMOoKQ&s",
    status: 'FORGERIES'
  },
  {
    id: 'user_007',
    source: "https://pbs.twimg.com/media/G0lht5cWsAEE4eu.jpg",
    status: 'FORGERIES'
  },
  {
    id: 'user_008',
    source: "https://cdnb.artstation.com/p/assets/images/images/050/783/673/large/wong-le-yi-grace-image-6487327-1.jpg?1655700516&dl=1",
    status: 'FORGERIES'
  },
  {
    id: 'user_009',
    source: "https://i.ytimg.com/vi/5U_NQmpFOtI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBhJ8HuHgfqisDRHkV-LOyNU-nZAw",
    status: 'FORGERIES'
  },
  {
    id: 'user_010',
    source: "https://external-preview.redd.it/astarion-in-gartic-phone-by-me-v0-YXJ5OHU1b2ZhZWFkMcEFozTq7n1vsj0ZWIvKWj9_7TGytSR9FnVHV7IroSSq.png?format=pjpg&auto=webp&s=d40c828d8f5fffc71ae9629201991031a0a0ecf6",
    status: 'FORGERIES'
  }
];

const RoundJudging: React.FC = (props) => {

  // --------------------[STATES]---------------------

  const [ribbons, setRibbons] = useState([]);

  const [roundArtworks, setRoundArtworks] = useState<ArtworkTypes[]>(FAKE_ARTWORKS);

  // -------------------[HANDLERS]--------------------

  // fetching the round's artwork

  // tracking dragging
  const handleDragEnd = (e: DragEndEvent) => {

    const { active, over } = e;

    if (!over) return;

    const artworkId = active.id as string;
    const newStatus = over.id as ArtworkTypes['status'];

    setRoundArtworks(() => roundArtworks.map(artwork => artwork.id === artworkId ? {
      ...artwork,
      status: newStatus,
    } : artwork))
  }

  // --------------------[RENDER]---------------------

  return (
    <>
    <DndContext onDragEnd={handleDragEnd}>
      <Flex gap="middle" align="center" vertical>
        <Flex style={ribbonsStyle} justify='space-evenly' align='center'>
          {RIBBONS.map((ribbon) => {
            return (
              <Ribbon
                key={ribbon.id}
                ribbon={ribbon}
                artworks={roundArtworks.filter(artwork => artwork.status === ribbon.id)} />
            )
          })}
        </Flex>
      </Flex>
      <Divider variant="dotted" style={{ borderColor: '#3B262C' }}>
        Forgeries
      </Divider>
      <Flex gap="middle" align="center" vertical>
        <Flex wrap style={ribbonsStyle} justify='space-evenly' align='center'>
          {STATUS.map((status) => {
            return (
              <Forgeries
                key={status.id}
                status={status}
                artworks={roundArtworks.filter(artwork => artwork.status === status.id)} />
            )
          })}
        </Flex>
      </Flex>
    </DndContext>
    </>
  )
}

export default RoundJudging;
