// Reference image that will show on artist view and curator view after a reference is picked from reference search

import React from 'react'
import { Image } from '../antdComponents'

type props = {
  title: string,
  image: string,
  description: string
}


const Reference = (props) => {
  let { title, image, description } = props;
  if(!title){
    title = 'Wait for the Curator'
    image = 'https://weirdal.wpenginepowered.com/wp-content/themes/weirdal/dist/assets/images/2025/al.png'
    description = 'Weird Al!'
  }
  return(
    <div>
    <h3>
    {title}
    </h3>  
      <Image src={image} />
    </div>
  )
};

export default Reference;