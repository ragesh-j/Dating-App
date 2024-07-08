import sentListStyle from"./sent.module.css"
import { useEffect, useState } from "react";
function Sent(){
   
    const [users,setUsers]=useState([])
    useEffect(()=>{
        const fetchSentList=async()=>{
            const response=await fetch("http://localhost:8000/sent-list",{
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
        fetchSentList()
      },[])
    return<>
     <div className={sentListStyle.sent_list}>
        <h2>sents</h2>
      {users.map(user => (
        <div key={user._id} className={sentListStyle.sent_list_item} >
          <img src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} className={sentListStyle.profile_image} />
          <div className={sentListStyle.user_info}>
            <h4 className={sentListStyle.user_name}>{user.firstName} {user.lastName}</h4>
          </div>
        </div>
      ))}
    </div>
    </>

}
export default Sent