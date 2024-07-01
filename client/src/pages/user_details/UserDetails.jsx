import { useEffect, useState } from "react"
import "./userDetails.css"

import { useParams } from "react-router-dom"
function UserProfileDetails(){
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
    },[id])
    return <>
    <div className="profile-view">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-images">
            <img className="profile-picture" src={userDetail.profileImage} alt="Profile" />
            
             {userDetail.additionalImage1&& <img className="additional-image" src={userDetail.additionalImage1} alt={`Image1`} />}
              {userDetail.additionalImage2&&<img className="additional-image" src={userDetail.additionalImage2} alt={`Image2`} />}
              {userDetail.additionalImage3&&<img className="additional-image" src={userDetail.additionalImage3} alt={`Image1`} />}
           
          </div>
          <div className="profile-basic-info">
            <h2>{userDetail.first_name} {userDetail.last_name}, {(userDetail.age)}</h2>
            <p className="profile-bio">{userDetail.bio}</p>
          </div>
        </div>
        <div className="profile-details">
          <p><strong>Qualification:</strong> {userDetail.qualification}</p>
          <p><strong>Occupation:</strong> {userDetail.occupation}</p>
          <p><strong>Company:</strong> {userDetail.company}</p>
          <p><strong>Designation:</strong> {userDetail.designation}</p>
          <p><strong>Hobbies:</strong> {userDetail.hobbies}</p>
          <p><strong>Interests:</strong> {userDetail.interests.join(', ')}</p>
        </div>
      </div>
    </div>
    </>
}
export default UserProfileDetails