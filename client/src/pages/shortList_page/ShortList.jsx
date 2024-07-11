import { useNavigate } from "react-router-dom";
import shortListStyle from"./shortList.module.css"
import { useEffect, useState } from "react";
function ShortList(){
    const navigate=useNavigate()
    const [users,setUsers]=useState([])
    useEffect(()=>{
        const fetchShortListList=async()=>{
            const response=await fetch("http://localhost:8000/shortList-list",{
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
        fetchShortListList()
      },[])
    return<>
     <div className={shortListStyle.shortList_list}>
        <h2>shortLists</h2>
      {users.map(user => (
        <div key={user._id} className={shortListStyle.shortList_list_item} onClick={()=>navigate(`/home/userDetails/${user._id}`)} >
          <img src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} className={shortListStyle.profile_image} />
          <div className={shortListStyle.user_info}>
            <h4 className={shortListStyle.user_name}>{user.firstName} {user.lastName}</h4>
          </div>
        </div>
      ))}
    </div>
    </>

}
export default ShortList