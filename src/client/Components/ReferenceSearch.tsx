// Search that sends request to server for server to request to the API for the keyword searched

import React from 'react'

import { Input } from 'antd'
import type { GetProps } from 'antd';

const { Search } = Input

type SearchProps = GetProps<typeof Input.Search>;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const ReferenceSearch = () => {
  return (
    <>
      <Search 
      placeholder='Some fine art'
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
      />
    </>
  )
};

export default ReferenceSearch;