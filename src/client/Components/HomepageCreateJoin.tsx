import React from "react";
import { useSocketContext } from "../context";

// ANTD
import { Flex, Row, Col } from "../antdComponents";

// COMPONENTS
import CreateGameButton from "./CreateGameButton";
import GameCodeJoin from "./GameCodeJoin";

const joinCreateStyle: React.CSSProperties = {
  width: "100%",
  height: 350,
  borderRadius: 6,
  border: "3px solid #3B262C",
};

const HomepageCreateJoin = ({username, loggedIn}) => {

  if (!loggedIn){
    return null;
  }

  return (
    <Flex style={joinCreateStyle} justify="center" align="center">
      <Col>
        <Row>
          <CreateGameButton username={username} />
        </Row>
        <p />
        <Row>
          <GameCodeJoin username={username} />
        </Row>
      </Col>
    </Flex>
  );
};

export default HomepageCreateJoin;
