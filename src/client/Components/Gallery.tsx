// Gallery that shows all round winners and their ribbons after the last round in a carousel

import React from "react";
import { useState } from 'react';

import { 
  Carousel,
  Flex,
} from "../antdComponents";

import Artwork from "./Artwork";

const contentStyle: React.CSSProperties = {
  margin: 0,
  width: '1920px',
  height: '720px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
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

const Gallery: React.FC = (props) => {

  const [galleryArtworks, setGalleryArtworks] = useState(fakeArtworks)

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <>
      <Flex>
        <Flex>
          
        </Flex>
      </Flex>
      <Carousel arrows infinite={true} autoplay>
        {
          galleryArtworks.map((artwork) => {
            return (
              <Artwork image={artwork} size='1280px'/>
            );
          })
        }
      </Carousel>
    </>
  );
}

export default Gallery;
