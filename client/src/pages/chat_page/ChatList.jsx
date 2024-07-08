import chatListStyle from "./chatList.module.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function ChatList(){
  
  const navigate=useNavigate()
  const [users,setUsers]=useState([])
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

  return (
    <div className={chatListStyle.chat_list}>
        <h2>Chats</h2>
      {users.map(user => (
        <div key={user._id} className={chatListStyle.chat_list_item} onClick={()=>handleMessage(user._id)}>
          <img src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} className={chatListStyle.profile_image} />
          <div className={chatListStyle.user_info}>
            <h4 className={chatListStyle.user_name}>{user.firstName} {user.lastName}</h4>
          </div>
        </div>
      )).reverse()}
    </div>
  );
};


export default ChatList;