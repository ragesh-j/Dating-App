import ReceiveListStyle from"./receive.module.css"
import { useEffect, useState } from "react";
import imges from "../../assets/vonecia-carswell-0aMMMUjiiEQ-unsplash.jpg"
function Receive(){
    const user=[
        {
          id: '1',
          firstName: 'Ragesh',
          lastName: 'J',
          profileImage: imges,
        },
        {
          id: '2',
          firstName: 'John',
          lastName: 'Doe',
          profileImage: 'https://via.placeholder.com/150',
        },
        {
          id: '3',
          firstName: 'Jane',
          lastName: 'Smith',
          profileImage: 'https://via.placeholder.com/150',
        }, {
            id: '1',
            firstName: 'Ragesh',
            lastName: 'J',
            profileImage: imges,
          },
          {
            id: '2',
            firstName: 'John',
            lastName: 'Doe',
            profileImage: 'https://via.placeholder.com/150',
          },
          {
            id: '3',
            firstName: 'Jane',
            lastName: 'Smith',
            profileImage: 'https://via.placeholder.com/150',
          },
      ];
    const [users,setUsers]=useState([])
    const handleAcceptRequest = async (id) => {
      try {
        const response = await fetch(`http://localhost:8000/update-request`, {
          method: "POST",
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
          },
          body: JSON.stringify({ senderId: id,status:"accepted" })
        });
        const data = await response.json();
        
        if (response.ok) {
          console.log(data)
          setUsers((prevUser)=>{
            return prevUser.map((user)=>{
              return user._id===id ? {...user,status:"accepted"}:user
            })
          })
        }
      } catch (error) {
        console.error('Error accepting request:', error);
      }
    };
    const handleRejectRequest = async (id) => {
      try {
        const response = await fetch(`http://localhost:8000/update-request`, {
          method: "POST",
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
          },
          body: JSON.stringify({ senderId: id,status:"rejected" })
        });
        const data = await response.json();
        
        if (response.ok) {
          console.log(data)
          setUsers((prevUser)=>{
            return prevUser.map((user)=>{
              return user._id===id ? {...user,status:"rejected"}:user
            })
          })
        }
      } catch (error) {
        console.error('Error accepting request:', error);
      }
    };
    useEffect(()=>{
        const fetchReceiveList=async()=>{
            const response=await fetch("http://localhost:8000/received-list",{
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
        fetchReceiveList()
      },[])
    return<>
     <div className={ReceiveListStyle.receive_list}>
        <h2>Received</h2>
      {users.map(user => (
        <div key={user._id} className={ReceiveListStyle.receive_list_item} >
          <img src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} className={ReceiveListStyle.profile_image} />
          <div className={ReceiveListStyle.user_info}>
            <h4 className={ReceiveListStyle.user_name}>{user.firstName} {user.lastName}</h4> 
          </div>
          {console.log(user.status)}
       {user.status!=="accepted" && user.status!=="rejected" && (<div className={ReceiveListStyle.buttons_container}>
          <button onClick={()=>handleAcceptRequest(user._id)}>Accept</button>
          <button onClick={()=>handleRejectRequest(user._id)}>Reject</button>
        </div>)}
        </div>
      ))}
    </div>
    </>

}
export default Receive