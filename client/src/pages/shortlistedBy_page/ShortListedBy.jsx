import shortListedByStyle from"./shortListedBy.module.css"
import { useEffect, useState } from "react";
function ShortListedBy(){
   
    const [users,setUsers]=useState([])
    useEffect(()=>{
        const fetchShortListedByList=async()=>{
            const response=await fetch("http://localhost:8000/shortListedBy-list",{
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
        fetchShortListedByList()
      },[])
    return<>
     <div className={shortListedByStyle.shortListedBy_list}>
        <h2>Shortlisted By</h2>
      {users.map(user => (
        <div key={user._id} className={shortListedByStyle.shortListedBy_list_item} >
          <img src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} className={shortListedByStyle.profile_image} />
          <div className={shortListedByStyle.user_info}>
            <h4 className={shortListedByStyle.user_name}>{user.firstName} {user.lastName}</h4>
          </div>
        </div>
      ))}
    </div>
    </>

}
export default ShortListedBy;