// Contains the Reference and ReferenceSearch components

import React from 'react'
import {
  Divider,
  Col,
  Row,
  Flex,
  FlexProps,
  Segmented
} from 'antd';

import ReferenceSearch from './ReferenceSearch'
import Reference from './Reference'


const CuratorSearch = () => {

  return(
    <Flex gap="middle" align="center" vertical>
      <Divider>
        <ReferenceSearch />
      </Divider>
      <Divider>
        <Reference />
      </Divider>
    </Flex>
  )
}

export default CuratorSearch