// Contains the Reference and ReferenceSearch components

import React, { useState } from "react";
import { Divider, Flex, Button } from "../antdComponents";

import ReferenceSearch from "./ReferenceSearch";
import Reference from "./Reference";
import { selectDomainDefinition } from "recharts/types/state/selectors/axisSelectors";
import { describe } from "node:test";
import axios from "axios";

const CuratorSearch = () => {
  const [selected, setSelected] = useState(0);
  const [results, setResults] = useState([]);
  const [confirmed, setConfirmed] = useState(false)

  const nextResult = () => {
    setSelected(selected + 1);
  };

  const handleSearch = function (query) {
    //api call, update state
    axios
      .get(`/curator/${query}`)
      .then(({ data }) => {
        console.log(data);
        if (data) {
          setResults(data);
        } else {
          console.log("no results :/");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const selectReference = function (){
    axios.post('/curator/select', {piece : results[selected]})
      .then((res)=>{
        console.log('reference posted!')
        setConfirmed(true)
      })
      .catch((err)=>{
        console.log(err)
        console.log('failed to post ref selection')
      })
  }
  return (
    <Flex gap="middle" align="center" vertical>
      <Divider>
        <ReferenceSearch handleSearch={handleSearch} disabled={results.length}/>
        {(results.length > 0 && results.length < 4) ? `That search didn't get enough results, you can try again` : `Choose a Reference!`}
      </Divider>
      <Divider>
        <Reference {...results[selected]} />
        <Button onClick={nextResult} disabled={selected >= results.length - 1}>
          {results.length === 0
            ? "Search For Some Inspiration!"
            : `Result ${selected + 1} out of ${results.length}`}
        </Button>
        <Button onClick={selectReference} disabled={confirmed || results.length === 0}>{!confirmed ? `Choose this Piece` : `Reference Selected!`}</Button>
      </Divider>
    </Flex>
  );
};

export default CuratorSearch;
