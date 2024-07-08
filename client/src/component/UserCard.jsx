import React, { useContext } from 'react';
import useCardStyle from './userCard.module.css'

import { useNavigate } from 'react-router-dom';
const UserCard = ({ user }) => {
  const navigate=useNavigate()
 
  return (
    <div className={useCardStyle.user_card} onClick={async()=>{

      navigate(`/home/userDetails/${user.id}`)
    }}>
      <div className={useCardStyle.profile_pic_container}>
      <img src={user.profilePic} alt="Profile" className= {useCardStyle.profile_pic} />
      </div>
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
     
    </div>
  );
};

export default UserCard;