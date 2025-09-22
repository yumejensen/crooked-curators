// Contains the Reference and ReferenceSearch components

import React, { useState } from 'react'
import {
  Divider,
  Flex,
} from '../antdComponents';

import ReferenceSearch from './ReferenceSearch'
import Reference from './Reference'
import { selectDomainDefinition } from 'recharts/types/state/selectors/axisSelectors';
import { describe } from 'node:test';
import axios from 'axios';


const CuratorSearch = () => {
  const [selected, setSelected] = useState({title: "Starry Night", description: '', image: 'https://www.farmersalmanac.com/wp-content/uploads/2020/11/Starry-Night-Van-Gogh-Which-Stars-GoogleArtProject-1536x817.jpg' })
  const [results, setResults] = useState(
    [
      {
        title: "Starry Night", 
        description: '', 
        image: 'https://www.farmersalmanac.com/wp-content/uploads/2020/11/Starry-Night-Van-Gogh-Which-Stars-GoogleArtProject-1536x817.jpg'
      }, 
      {
        title: 'Mona Lisa', 
        description: '', 
        image:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg'
      },
      {
        title: 'The Son of Man',
        description: '',
        image: 'https://sep.turbifycdn.com/ty/cdn/madisonartshop/most-famous-paintings-17.jpg?t=1747540933&'
      }
    ]
  )

  const handleSearch = function(query){
    //api call, update state
    axios.get(`/curator/${query}`)
    .then(({data})=>{
      console.log(data)
    })
    .catch((err)=>{
      console.error(err)
    })
  }
  return(
    <Flex gap="middle" align="center" vertical>
      <Divider>
        <ReferenceSearch handleSearch={handleSearch}/>
      </Divider>
      <Divider>
        <Reference title={selected.title} />
      </Divider>
    </Flex>
  )
}

export default CuratorSearch;