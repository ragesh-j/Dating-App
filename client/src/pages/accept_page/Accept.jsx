import acceptStyle from"./accept.module.css"
import imges from "../../assets/vonecia-carswell-0aMMMUjiiEQ-unsplash.jpg"
import { useEffect, useState } from "react";
function Accept(){
    
    const [bySenderUsers,setBySenderUsers]=useState([])
    const [byReceiverUsers,setByReceiverUsers]=useState([])
    useEffect(()=>{
        const fetchSendAcceptList=async()=>{
            const response=await fetch("http://localhost:8000/sender-accept-list",{
                headers:{
                    'Content-type':'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            })
            const data=await response.json()
            if(response.ok){
                setBySenderUsers(data)
                console.log(data)
            }
        }
        const fetchRecieveAcceptList=async()=>{
            const response=await fetch("http://localhost:8000/receiver-accept-list",{
                headers:{
                    'Content-type':'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            })
            const data=await response.json()
            if(response.ok){
                setByReceiverUsers(data)
                console.log(data)
            }
        }
        fetchSendAcceptList()
        fetchRecieveAcceptList()
        
      },[])
    return<>
     <div className={acceptStyle.accept_list}>
        <h2>Connection you have Accepted</h2>
      {byReceiverUsers.map(user => (
        <div key={user._id} className={acceptStyle.accept_list_item} >
          <img src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} className={acceptStyle.profile_image} />
          <div className={acceptStyle.user_info}>
            <h4 className={acceptStyle.user_name}>{user.firstName} {user.lastName}</h4>
          </div>
        </div>
      ))}
    </div>
    <div className={acceptStyle.accept_list}>
        <h2>Connection others have Accepted</h2>
      {bySenderUsers.map(user => (
        <div key={user._id} className={acceptStyle.accept_list_item} >
          <img src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} className={acceptStyle.profile_image} />
          <div className={acceptStyle.user_info}>
            <h4 className={acceptStyle.user_name}>{user.firstName} {user.lastName}</h4>
          </div>
        </div>
      ))}
    </div>
    </>

}
export default Accept;