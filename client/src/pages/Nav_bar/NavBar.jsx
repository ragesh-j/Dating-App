import React from 'react';
import { Link } from 'react-router-dom';
import navStyle from "./navBar.module.css"
const NavBar = () => {
  return (
    <nav className={navStyle.navbar}>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;