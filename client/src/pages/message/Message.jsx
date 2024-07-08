import { useEffect, useRef, useState } from "react";
import messageStyles from "./message.module.css"
import { useParams } from "react-router-dom";
import {io} from 'socket.io-client'
function Message(){
    const{conversationId,receiverId}=useParams()
    const[userId,setUserId]=useState("")
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage,setArrivalMessage]=useState("")
    const scrollRef=useRef()
    const socket=useRef()

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSubmit=async()=>{

    socket.current.emit("sendMessage",{
      senderId:userId,
      receiverId:receiverId,
      text:newMessage
    })

    try{
        const response=await fetch("http://localhost:8000/message",{
            method:"POST",
            headers:{
                'Content-type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            },
            body:JSON.stringify({conversationId:conversationId,text:newMessage})

        })
        const data=await response.json()
        if(!response.ok){
            console.log(data)
        }else{
            console.log(data)
            setMessages([...messages,data])
            setNewMessage("")
        }
        
    }
    catch(err){
        console.log(err)
    }
  }

  useEffect(()=>{
    
    const getMessages=async()=>{
        try{
            const response=await fetch(`http://localhost:8000/message/${conversationId}`,{
                headers:{
                    'Content-type':'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            })
            const data=await response.json()
            if(!response.ok){
                console.log(data)
            }else{
                setUserId(data.userId)
                setMessages(data.message)
            }
        }catch(err){
            console.log(err)
        }
    }
    getMessages()
  },[conversationId])

  useEffect(()=>{
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }
  },[messages])

useEffect(()=>{
  socket.current=io('ws://localhost:8900')
  socket.current.on("getMessage",data=>{
    setArrivalMessage({
      senderId:data.senderId,
      text:data.text,
      createdAt:Date.now()
    })
  })
  return () => {
    socket.current.disconnect();
};
},[])

useEffect(()=>{
  if(arrivalMessage){
  setMessages(prev=>[...prev,arrivalMessage])
  }
},[arrivalMessage])
  useEffect(()=>{
    if(userId){
    socket.current.emit("adduser",userId)
    socket.current.on("getusers",users=>{
      console.log(users)
    })
    }
  },[userId])


  return (
    <div className={messageStyles.messageContainer}>
      <div className={messageStyles.messageHeader}>
        <h4>Conversation</h4>
      </div>
      <div className={messageStyles.messageList} ref={scrollRef}>
        {messages.map((message, index) => (
          <div key={index} className={`${messageStyles.messageItem} ${message.senderId === userId ? messageStyles.sent : messageStyles.received}`}>
            <p>{message.text}</p>
            <span className={messageStyles.timestamp}>{formatTime(message.createdAt)}</span>
          </div>
        ))}
      </div>
      <div className={messageStyles.messageInput}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className={messageStyles.inputField}
        />
        <button className={messageStyles.sendButton} onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
    
}
export default Message;