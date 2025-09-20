import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

import { Layout, Menu } from 'antd'
const { Header } = Layout

// declare navbar items
const items = [
  {
    key: "Homepage",
    label: (<Link to='/'>Home</Link>)
  },
  {
    key: "Profile",
    label: (<Link to='/profile'>Profile</Link>)
  },
  {
    key: "GameSettings",
    label: (<Link to='/game-settings'>Game Settings</Link>)
  },
  {
    key: "ActiveGame",
    label: (<Link to='/game'>Game</Link>)
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