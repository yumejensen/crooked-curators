import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  Breadcrumb,
  Layout,
  theme,
  Content,
  Footer,
  ConfigProvider
} from './antdComponents';

import './CSS/style.module.css';

// -------------------[COMPONENTS]------------------
import NavBar from './Components/NavBar';

import Homepage from './Views/Homepage';
import Profile from './Views/Profile';
import GameSettings from './Views/GameSettings';
import ActiveGame from './Views/ActiveGame';
import RoundJudging from './Components/RoundJudging';
import Gallery from './Components/Gallery';
import CuratorSearch from './Components/CuratorSearch';

// const items = Array.from({ length: 15 }).map((_, index) => ({
//   key: index + 1,
//   label: `nav ${index + 1}`,
// }));

// Context imports
import { User, UserContext, useUserContext, fetchUser } from './context';
import { Socket, io } from 'socket.io-client';
import axios from 'axios';
import { RawPurePanel } from 'antd/es/popover/PurePanel';

const App: React.FC = () => {
  const socketRef = React.useRef<Socket | null>(null);
  const socket = socketRef.current;

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  // --------------------[STATES]---------------------
  const [view, setView] = useState('Homepage');
  const [user, setUser] = useState<User>({
    username: null,
    loggedIn: false
  });
  /* represent connected status with socketId on UI (note: this is reactive as opposed to socketRef. no re-render will occur for anything related to socketRef - good for performance) */
  const [userSocketId, setUserSocketId] = useState<string | null>(null);

  /*
   * anyone who opens app upon login:
   * 1. create socket
   * 2. update user with socket id (add to state)
   * 3. fetch user
   *
   * if creating game
   * 4. create game - http
   * 5. join game
   *
   * if joining game
   * 4. join game
   */

  // socket connection state
  const [isConnected, setIsConnected] = useState(socket?.connected || false);
  // game code state
  const [roomCode, setRoomCode] = useState('');
  // players state
  const [players, setPlayers] = useState([]);

  // put socket listeners inside useEffect
  useEffect(() => {
    if (!socket) {
      return;
    }
    // functions to pass into listeners
    function getRoomCode(roomCodeObj) {
      console.log('game info from server', roomCodeObj);
      setRoomCode(roomCodeObj.roomCode);
      setPlayers(roomCodeObj.player);
    }

    // socket listeners
    socket.on('sendRoomCode', getRoomCode);

    // socket.off for listeners
    return () => {
      socket.off('sendRoomCode', getRoomCode);
    };
  }, []);

  useEffect(() => {
    console.log('looky:', socketRef.current);
    if (socketRef.current) {
      return;
    }

    socketRef.current = io();
    /* we can see the socket but this is value by reference so we don't have access to the id yet but it might look like we do in the browser */
    console.log('looky2:', socketRef.current);
    /* notice this is undefined because the socket connection has not been established yet and we don't have access to the id until then */
    console.log('looky3:', socketRef.current?.id);

    console.log('hua: ', user.id);

    const onConnect = async () => {
      const socket = socketRef.current;
      if (!socket.id) {
        console.error('Socket ID is not available');
        return;
      }
      /* below we know we have access to the id because we are inside the connect listener that tells us a connection has been established successfully */
      console.log('socket', socket.id);
      setIsConnected(true);

      try {
        console.log('SOCKO', socket.id);

        /* now that we know the socket id we can update the user with it */
        axios.put('/api/user/socketId', { socketId: socket.id });
        setUserSocketId(socket.id);
        /* order is important. we need to fetch the user after attaching the socketId if we want access to the socketId on the user in the client (hint, hint) */
        const { data } = await fetchUser();
        setUser({ username: data.username, loggedIn: true });
      } catch (err) {
        console.error('Error initializing socket:', err);
        setUser({ username: null, loggedIn: false });
      }
    };

    const socket = socketRef.current;
    socket.on('connect', onConnect);

    return () => {
      socket.off('connect', onConnect);
      setUserSocketId(null);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: '#058f6fff',
            colorBgLayout: '#F0E7CA',
            borderRadius: 2,

            // Alias Token
            colorBgContainer: '#ffffffff'
          }
        }}
      >
        <Layout>
          <NavBar />
          <div>{`CONTEXT: ${user.username}, ${user.loggedIn}`}</div>
          <Content
            style={{
              padding: '0 48px',
              color: '#3B262C'
            }}
          >
            <Breadcrumb
              style={{ margin: '16px 0' }}
              items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
            />
            <div
              style={{
                background: colorBgContainer,
                minHeight: 280,
                padding: 24,
                borderRadius: borderRadiusLG
              }}
            >
              <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/profile' element={<Profile />} />
                <Route
                  path='/game-settings'
                  element={
                    <GameSettings roomCode={roomCode} players={players} />
                  }
                />
                <Route path='/game' element={<ActiveGame />} />
                <Route path='/judging' element={<RoundJudging />} />
                <Route path='/gallery' element={<Gallery />} />
                <Route path='/curator' element={<CuratorSearch />} />

                <Route path='*' element={<p>There is nothing here: 404!</p>} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Crooked Curators ©{new Date().getFullYear()} Created by 4LOOP
          </Footer>
        </Layout>
      </ConfigProvider>{' '}
    </UserContext.Provider>
  );
};

export default App;
