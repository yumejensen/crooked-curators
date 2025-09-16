// import * as React from 'react';
import { Routes, Route } from 'react-router';
import axios from 'axios';

import Homepage from './Views/Homepage';
import LoginButton from './Views/LoginButton'

// export default function App () {
//     return (
//         <div>
//             <LoginButton />
//             <Routes>
//                 <Route path='/' element={<Homepage />} />
//             </Routes>
//         </div>
//     )
// }

import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;

// const items = Array.from({ length: 15 }).map((_, index) => ({
//   key: index + 1,
//   label: `nav ${index + 1}`,
// }));

const items = [
    {
        key: "home-1",
        label: "Home"
    },
    {
        key: "profile-1",
        label: "Profile"
    },
    {
        key: "sign-in-1",
        label: "Sign-In"
    },
    {
        key: "sign-out-1",
        label: "Sign-Out"
    }
];

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
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
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Crooked Curators ©{new Date().getFullYear()} Created by 4LOOP
      </Footer>
    </Layout>
  );
};

export default App;

/* <Route path='/login' element={<Login />}/> */