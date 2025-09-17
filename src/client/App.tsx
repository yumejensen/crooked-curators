import React from 'react';

import Homepage from './Views/Homepage';
import NavBar from './Components/NavBar';

import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;

// const items = Array.from({ length: 15 }).map((_, index) => ({
//   key: index + 1,
//   label: `nav ${index + 1}`,
// }));


const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <NavBar />
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

          <Homepage />
          
        </div>


      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Crooked Curators ©{new Date().getFullYear()} Created by 4LOOP
      </Footer>
    </Layout>
  );
};

export default App;
