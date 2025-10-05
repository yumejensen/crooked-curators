// Reference image that will show on artist view and curator view after a reference is picked from reference search

import React from "react";
import { Image } from "../antdComponents";
import { useGameContext } from "../context";

type props = {
  title: string;
  image: string;
  description: string;
};

const Reference = (props) => {
  let { title, image, description } = props;
  if (!title) {
    title = "Wait for the Curator";
    image =
      "https://www.farmersalmanac.com/wp-content/uploads/2020/11/Starry-Night-Van-Gogh-Which-Stars-GoogleArtProject-1536x817.jpg";
    description = "Weird Al!";
  }
  const { game } = useGameContext();
  title = game?.reference?.title ?? title;
  image = game?.reference?.src ?? image;
  return (
    <div>
      <h3>{title}</h3>
      <Image src={image} />
    </div>
  );
};

export default Reference;
