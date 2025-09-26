import React from "react";
import { useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";

import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Header,
  Content,
  Footer,
  ConfigProvider,
} from "./antdComponents";

import "./CSS/style.module.css";

// -------------------[COMPONENTS]------------------
import NavBar from "./Components/NavBar";

import Homepage from "./Views/Homepage";
import Profile from "./Views/Profile";
import GameSettings from "./Views/GameSettings";
import ActiveGame from "./Views/ActiveGame";
import RoundJudging from "./Components/RoundJudging";
import Gallery from "./Components/Gallery";
import CuratorSearch from "./Components/CuratorSearch";

// const items = Array.from({ length: 15 }).map((_, index) => ({
//   key: index + 1,
//   label: `nav ${index + 1}`,
// }));

// Context imports
import { User, UserContext, useUserContext } from "./context";

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // --------------------[STATES]---------------------
  const [view, setView] = useState("Homepage");
  const [user, setUser] = useState<User>({
    username: "Guest",
    loggedIn: false,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#058f6fff",
            colorBgLayout: "#F0E7CA",
            borderRadius: 2,

            // Alias Token
            colorBgContainer: "#ffffffff",
          },
        }}
      >
        <Layout>
          <NavBar />
          <div>{`CONTEXT: ${user.username}, ${user.loggedIn}`}</div>
          <Content
            style={{
              padding: "0 48px",
              color: "#3B262C",
            }}
          >
            <Breadcrumb
              style={{ margin: "16px 0" }}
              items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
            />
            <div
              style={{
                background: colorBgContainer,
                minHeight: 280,
                padding: 24,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/game-settings" element={<GameSettings />} />
                <Route path="/game" element={<ActiveGame />} />
                <Route path="/judging" element={<RoundJudging />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/curator" element={<CuratorSearch />} />

                <Route path="*" element={<p>There is nothing here: 404!</p>} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Crooked Curators ©{new Date().getFullYear()} Created by 4LOOP
          </Footer>
        </Layout>
      </ConfigProvider>{" "}
    </UserContext.Provider>
  );
};

export default App;
