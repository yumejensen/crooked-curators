import React from 'react';
import { useState } from 'react';

import { 
  Breadcrumb, Layout, 
  Menu, theme, Header, 
  Content, Footer
} from './antdComponents'

// -------------------[COMPONENTS]------------------
import NavBar from './Components/NavBar';

import Homepage from './Views/Homepage';
import Profile from './Views/Profile';
import GameSettings from './Views/GameSettings';
import ActiveGame from './Views/ActiveGame';


// const items = Array.from({ length: 15 }).map((_, index) => ({
//   key: index + 1,
//   label: `nav ${index + 1}`,
// }));


const Views: React.FC = (props) => {

  // --------------------[STATES]---------------------
  const { view } = props;

  // ---------------[VIEW CONDITIONALS]---------------
  if(view === "Homepage"){
    return (<Homepage />)

  } else if(view === "Profile"){
    return (<Profile />)

  } else if(view === "GameSettings"){
    return (<GameSettings />)

  } else if(view === "ActiveGame"){
    return (<ActiveGame />)

  }
}

const App: React.FC = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // --------------------[STATES]---------------------
  const [view, setView] = useState('Homepage')

  // -------------------[COMPONENTS]------------------



  // --------------------[HELPERS]--------------------

  const handleClick = (e) => {
    const { key } = e;

    // set view state to the tab clicked in navbar
    setView(key);
  }

  return (
    <Layout>
      <NavBar onClick={handleClick}/>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          Content

          <Views view={view} />

        </div>


      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Crooked Curators ©{new Date().getFullYear()} Created by 4LOOP
      </Footer>
    </Layout>
  );
};

export default App;
