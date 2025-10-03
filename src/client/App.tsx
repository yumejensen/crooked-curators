import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import axios from 'axios';
import { Socket, io } from 'socket.io-client';
import { RawPurePanel } from 'antd/es/popover/PurePanel';

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
import SwitchView from './SwitchView';

import Homepage from './Views/Homepage';
import Profile from './Views/Profile';
import GameSettings from './Views/GameSettings';
import ActiveGame from './Views/ActiveGame';
import RoundJudging from './Components/RoundJudging';
import Gallery from './Components/Gallery';
import CuratorSearch from './Components/CuratorSearch';

// Context imports
import {
  User,
  UserContext,
  useUserContext,
  fetchUser,
  Game,
  Player,
  GameContext,
  useGameContext,
  SocketContext,

} from './context';



const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  // --------------------[STATES]---------------------
 
  const [user, setUser] = useState<User>({
    username: null,
    loggedIn: false,
  });

  function updateUser() {
    fetchUser()
      .then(({ data }) => {
        if (data) {
          setUser({ username: data.username, loggedIn: true });
        }
      })
      .catch((err) => {
        setUser({ username: null, loggedIn: false });
      });
  }
   /* represent connected status with socketId on UI (note: this is reactive as opposed to socketRef. 
      no re-render will occur for anything related to socketRef - good for performance) */
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

  const [game, setGame] = useState<Game>({
    code: '',
    stage: "lobby",
    curator: null,
    role: null,
    players: [],
  });

  // socket connection state
  const [isConnected, setIsConnected] = useState(socket?.connected || false);
  // game code state
  const [roomCode, setRoomCode] = useState("");
  // players state
  const [players, setPlayers] = useState([]);

  // start game state
  const [startGame, setStartGame] = useState(false)




  useEffect(() => {
    if(socket) return; // socket already exists
    const newSocket = io(); // connect to the server that served the page
    setSocket(newSocket);
    
    // SOCKET FUNCTIONS
    const onConnect = async () => {
      if (!newSocket.id) {
        console.error('Socket ID is not available');
        return;
      }
      /* below we know we have access to the id because we are inside the connect listener that tells us a connection has been established successfully */
      console.log('socket', newSocket.id);
      setIsConnected(true);

      try {
        console.log('SOCKO', newSocket.id);

        /* now that we know the socket id we can update the user with it */
        axios.put('/api/user/socketId', { socketId: newSocket.id });
        setUserSocketId(socket.id);

        /* order is important. we need to fetch the user after attaching the socketId if we want access to the socketId on the user in the client (hint, hint) */
        const { data } = await fetchUser();
        setUser({ username: data.username, loggedIn: true });

      } catch (err) {
        console.error('Error initializing socket:', err);
        setUser({ username: null, loggedIn: false });
      }

    };

    function getRoomCode(roomCodeObj) {
      console.log("game info from server", roomCodeObj);
      // update the room code
      setRoomCode(roomCodeObj.roomCode);
      // update players array
      setPlayers(roomCodeObj.players);
    }

    function roundAdvance (roundInfo){
      console.log('round advancing');
      // update the game context
      setGame(roundInfo)
    }
    
    function switchView () {
      // based on the game context, switch the view the player sees
      // set startGame to true
      setStartGame(true)
    }


    // SOCKET LISTENERS
    newSocket.on('connect', onConnect);

    newSocket.on('sendRoomCode', getRoomCode);
    newSocket.on('newRound', roundAdvance);
    newSocket.on('switchView', switchView);

    // SOCKET OFF
    return () => {
      newSocket.off('connect', onConnect);
      newSocket.off('sendRoomCode', getRoomCode);
      newSocket.off('newRound', roundAdvance);
      newSocket.off('switchView', switchView);

      setUserSocketId(null);
    };

  }, []);
 

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <GameContext.Provider value={{ game, setGame }}>
        <SocketContext.Provider value={ { socket, setSocket }}>
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
          <div>{`User Context: ${user.username}, ${user.loggedIn} \n Game Context: ${Object.keys(game).map(key=> key + ':' + game[key])}`}</div>
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
                <Route 
                  path='/' 
                  element={
                    <Homepage socket={socket}/>
                  } 
                />
                <Route
                  path='/game-settings'
                  element={
                    <>
                    <SwitchView startGame={startGame} />
                    <GameSettings 
                      roomCode={roomCode} 
                      players={players} 
                      socket={socket}
                    />
                    </>
                  }
                />
                <Route path='/profile' element={<Profile />} />
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
      </SocketContext.Provider>
      </GameContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
