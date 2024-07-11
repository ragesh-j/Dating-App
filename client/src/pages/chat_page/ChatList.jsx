import chatListStyle from "./chatList.module.css"
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../routing/SocketProvider";
import classNames from 'classnames'
function ChatList(){
  const {socket,onlineUsers}=useContext(SocketContext)
  const navigate=useNavigate()
  const [users,setUsers]=useState([])
  const [friendOnline,setFriendOnline]=useState([])
  const onlineFriendsIds=new Set(friendOnline.map(user=>user.userId))
  const handleMessage=async(id)=>{
    try{
      const response=await fetch('http://localhost:8000/conversations',{
        method:'POST',
        headers:{
          'Content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body:JSON.stringify({receiverId:id})
      })
      const data=await response.json()
      if(!response.ok){
        console.log(response)
      }else{
        
        navigate(`/home/message/${data._id}/${id}`)
      }
    }
    catch(err){
      console.log(err)
    }
  }  
  useEffect(()=>{
    const fetchConversation=async()=>{
        const response=await fetch("http://localhost:8000/chat-list",{
            headers:{
                'Content-type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
        const data=await response.json()
        if(response.ok){
            setUsers(data)
            console.log(data)
        }
    }
    fetchConversation()
  },[])
  useEffect(()=>{
    setFriendOnline(onlineUsers.filter(user =>users.some(anotherUser => anotherUser._id === user.userId)))
  },[users,onlineUsers])

  return (
    <div className={chatListStyle.chat_list}>
        <h2>Chats</h2>
      {users.map(user => (
        <div key={user._id} className={chatListStyle.chat_list_item } onClick={()=>handleMessage(user._id)}>
          <img src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} className={classNames(chatListStyle.profile_image,{
             [chatListStyle.online]: onlineFriendsIds.has(user._id)
          })} />
          <div className={chatListStyle.user_info}>
            <h4 className={chatListStyle.user_name}>{user.firstName} {user.lastName}</h4>
          </div>
        </div>
      )).reverse()}
       {console.log('friendOnline',friendOnline)}
    </div>
   
  );
};


export default ChatList;