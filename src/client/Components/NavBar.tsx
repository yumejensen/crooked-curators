import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { Layout, Menu } from '../antdComponents'
const { Header } = Layout
import { SignInButton } from './SignInButton';
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
    key: "RoundJudging",
    label: (<Link to='/judging'>Judging</Link>)
  },
  {
    key: "Gallery",
    label: (<Link to='/gallery'>Gallery</Link>)
  },
  {
    key: "Sign-In",
    label: (<SignInButton />)
  }
];

const NavBar: React.FC = (props) => {

  return (
    <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#3B262C'}}>
      <div className="demo-logo" />
      <Menu
        onClick={props.onClick}
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={items}
        style={{ flex: 1, minWidth: 0, backgroundColor: '#3B262C' }}
      />
    </Header>
  );
};

export default NavBar;