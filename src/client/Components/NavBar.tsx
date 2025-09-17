import React from 'react'

import { Layout, Menu } from 'antd'
const { Header } = Layout

// declare navbar items
const items = [
    {
        key: "Homepage",
        label: "Home"
    },
    {
        key: "Profile",
        label: "Profile"
    },
    {
        key: "GameSettings",
        label: "Game Settings"
    },
    {
        key: "ActiveGame",
        label: "Game"
    },
    {
        key: "Sign-In",
        label: (<a href='/auth/google/'>Sign-In</a>)
    },
    {
        key: "Sign-Out",
        label: "Sign-Out"
    }
];

const NavBar: React.FC = (props) => {

  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" />
      <Menu
        onClick={props.onClick}
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