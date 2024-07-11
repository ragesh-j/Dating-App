import React, { createContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

 const SocketProvider = ({ children }) => {
    const socket = useRef(null);
    const [onlineUsers,setOnlineUsers]=useState([])
    const[istrue,setIsTrue]=useState(false)
    useEffect(() => {
        if(localStorage.getItem('jwtToken')){
            socket.current = io('ws://localhost:8900',{
                query:localStorage.getItem('jwtToken')
            });

            socket.current.on('connect', async() => {
                console.log('Connected to socket server');
                const userId = await getUserIdFromToken(localStorage.getItem('jwtToken'));
                socket.current.emit('adduser', userId);
                socket.current.on("getusers",users=>{
                    console.log(users)
                    setOnlineUsers(users)
                  })
            });
            
        }
       
    }, [istrue]);

    const getUserIdFromToken = async(token) => {
            const response=await fetch("http://localhost:8000/get-userid",{
                headers:{
                    'Content-type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('jwtToken')}`
                }
            })
            const data=await response.json()
            if(response.ok){
                return data.id
            }
    };
    return (
        <SocketContext.Provider value={{socket,onlineUsers,setIsTrue}}>
            {children}
        </SocketContext.Provider>
    );
};
export {
    SocketProvider,
    SocketContext
}