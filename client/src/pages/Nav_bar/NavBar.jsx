import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import navStyle from "./navBar.module.css";
import { SocketContext } from '../../routing/SocketProvider';

const NavBar = () => {
  const { socket, onlineUsers, setIsTrue } = useContext(SocketContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={navStyle.navbar}>
      <div className={navStyle.menuIcon} onClick={handleMenuToggle}>
        <div className={navStyle.bar}></div>
        <div className={navStyle.bar}></div>
        <div className={navStyle.bar}></div>
      </div>
      <ul className={`${navStyle.navLinks} ${isMenuOpen ? navStyle.navActive : ''}`}>
        <li onClick={()=>setIsMenuOpen(false)}><Link to="/home">Home</Link></li>
        <li onClick={()=>setIsMenuOpen(false)}><Link to="/home/editProfile">Profile</Link></li>
        <li onClick={()=>setIsMenuOpen(false)}><Link to="/home/sent">Sent</Link></li>
        <li onClick={()=>setIsMenuOpen(false)}><Link to="/home/accept">Accept</Link></li>
        <li onClick={()=>setIsMenuOpen(false)}><Link to="/home/reject">Reject</Link></li>
        <li onClick={()=>setIsMenuOpen(false)}><Link to="/home/received">Received</Link></li>
        <li onClick={()=>setIsMenuOpen(false)}><Link to="/home/shortlist">Shortlisted</Link></li>
        <li onClick={()=>setIsMenuOpen(false)}><Link to="/home/shortListedBy">Shortlisted By</Link></li>
        <li onClick={()=>setIsMenuOpen(false)}><Link to="/home/chatList">Chat List</Link></li>
        <li onClick={async () => {
          if (localStorage.getItem('jwtToken')) {
            await socket.current.disconnect();
            console.log('disconnected');
            localStorage.removeItem("jwtToken");
            setIsTrue(prev => !prev);
          }
          setIsMenuOpen(false)
        }}><Link to="/login">Logout</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;