import React from 'react'

import { Layout, Menu } from 'antd'
const { Header } = Layout

// declare navbar items
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
        label: (<a href='/auth/google/'>Sign-In</a>)
    },
    {
        key: "sign-out-1",
        label: "Sign-Out"
    }
];

const NavBar: React.FC = () => {

    return (
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
  );
};

export default NavBar;