
import { Link } from 'react-router-dom';
import navStyle from "./navBar.module.css"
const NavBar = () => {

  return (
    <nav className={navStyle.navbar}>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/home/sent">Sent</Link></li>
        <li><Link to="/home/accept">Accept</Link></li>
        <li><Link to="/home/reject">Reject</Link></li>
        <li><Link to="/home/received">Recieved</Link></li>
        <li><Link to="/home/shortlist">Shortlisted</Link></li>
        <li><Link to="/home/shortListedBy" >Shortlisted By</Link></li>
        <li><Link to="/home/chatList">Chat List</Link></li>
        <li onClick={()=>{
          localStorage.removeItem("jwtToken")
        }}><Link to="/login">Logout</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;