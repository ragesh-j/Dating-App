import { useEffect, useState } from "react"
import "./userDetails.css"

import { useNavigate, useParams } from "react-router-dom"
function UserProfileDetails(){
  const navigate=useNavigate()
   const{id}=useParams()
    const [userDetail,setUserdetail]=useState({
        profilePictureUrl:'',
        first_name:"",
        last_name:"",
        age:"",
        dateOfBirth:"",
        bio:"",
        qualification:"",
        occupation:"",
        company:"",
        designation:"",
        interests:[],
        hobbies:"",
        additionalImage1:"",
        additionalImage2:"",
        additionalImage3:""

    })
    const [requestStatus,setRequestStatus]=useState('none')
    
    const handleDontShow=async()=>{
        const response=await fetch(`http://localhost:8000/do-not-show`,{
          method:"POST",
          headers:{
            'Content-type':'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
          },
          body:JSON.stringify({profileId:id})
        })
        if(!response.ok){
          throw new Error('Network response was not ok');
        }
        const data=await response.json()
        navigate("/home")
        
    }


    const handleRequest=async()=>{
      const response=await fetch(`http://localhost:8000/send-request`,{
        method:"POST",
        headers:{
          'Content-type':'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body:JSON.stringify({receiverId:id})
      })
      const data=await response.json()
      if(!response.ok){
        
        console.log(data)
      }else{
        await handleDontShow()
       
        console.log(data)
      }
  
  }
  const fetchRequestStatus = async () => {
    try {
      const response = await fetch(`http://localhost:8000/status`, {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify({ otherUserId: id })
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data)
      }
      setRequestStatus(data.status);
    } catch (error) {
      console.error('Error fetching request status:', error);
    }
  };

  const handleMessage=async()=>{
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
  const handleAcceptRequest = async () => {
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
      console.log(data)
      if (!response.ok) {
        console.log(data);
      } else {
        await handleDontShow()
        console.log(data);
      }
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };
  const handleShortList=async()=>{
    const response=await fetch(`http://localhost:8000/shortlist`,{
      method:"POST",
      headers:{
        'Content-type':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      },
      body:JSON.stringify({receiverId:id})
    })
    const data=await response.json()
    if(!response.ok){
      
      console.log(data)
    }else{
     
      console.log(data)
    }

}


    useEffect(()=>{
      const fetchUserDetail=async()=>{
      try {
        const response = await fetch(`http://localhost:8000/user-detail/${id}`,{
          headers:{
            'Content-type':'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserdetail(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
    fetchUserDetail()
    fetchRequestStatus()
    },[id])
    return <>
   <div className="profile-view">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-images">
            <img className="profile-picture" src={userDetail.profileImage} alt="Profile" />
            {userDetail.additionalImage1 && <img className="additional-image" src={userDetail.additionalImage1} alt="Image1" />}
            {userDetail.additionalImage2 && <img className="additional-image" src={userDetail.additionalImage2} alt="Image2" />}
            {userDetail.additionalImage3 && <img className="additional-image" src={userDetail.additionalImage3} alt="Image3" />}
          </div>
          <div className="profile-basic-info">
            <h2>{userDetail.first_name} {userDetail.last_name}, {userDetail.age}</h2>
            <p className="profile-bio">{userDetail.bio}</p>
          </div>
        </div>
        <div className="profile-details">
          <p><strong>Qualification:</strong> {userDetail.qualification}</p>
          <p><strong>Occupation:</strong> {userDetail.occupation}</p>
          {userDetail.company&&<p><strong>Company:</strong> {userDetail.company}</p>}
          {userDetail.designation&&<p><strong>Designation:</strong> {userDetail.designation}</p>}
          {userDetail.level&&<p><strong>Level:</strong> {userDetail.level}</p>}
          <p><strong>Hobbies:</strong> {userDetail.hobbies}</p>
          <p><strong>Interests:</strong> {userDetail.interests.join(', ')}</p>
        </div>
        <div className="profile-button">
          <button onClick={handleShortList}>Shortlist</button>
          <button onClick={handleMessage}>Message</button>
          {requestStatus === 'sent' ? ( 
            <button disabled >Request Sent</button>
          ) : requestStatus === 'received' ? (
            <button onClick={handleAcceptRequest}>Accept Request</button>
          ) :requestStatus==='accepted' ?(
            <button>Accepted</button>
          ) :requestStatus==="rejected"?(
              <button>Rejected</button>
          ):(
            <button onClick={handleRequest}>Request</button>
          )}
          <button onClick={handleDontShow}>Don't show</button>
        </div>
      </div>
    </div>
    </>
}
export default UserProfileDetails