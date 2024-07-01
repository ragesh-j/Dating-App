import React, {  useRef, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import profileStyle from './profile.module.css';
import image  from "../../assets/no-profile-picture-icon-35.png"

import addImg from "../../assets/kisspng-linkedin-computer-icons-logo-vector-graphics-user-in-addition-svg-vector-icon-free-icons-uihere-5d1f3d583dcce5.7266464015623284082532.png"
function ProfileForm() {
    const navigate=useNavigate()
    const profileRef=useRef(null)
    const additionalImgRef1=useRef(null)
    const additionalImgRef2=useRef(null)
    const additionalImgRef3=useRef(null)
    const [profile, setProfile] = useState({
        bio:"",
        dob: '',
        age: '',
        qualification: '',
        hobbies: '',
        drinking: '',
        smoking: '',
        profileImage: "",
        additionalImage1:"" ,
        additionalImage2:"",
        additionalImage3: "",
        gender:"",
        interests:""
    });

    const handleInputChange = (e) => {
        
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const token=localStorage.getItem('jwtToken')
        if(!token){
            navigate("/login")
        }
        try{
        const response=await fetch("http://localhost:8000/profile",{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`

            },
            body:JSON.stringify(profile)
            
        })
        if(response.ok){
            const data=await response.json();
            navigate("/employement")
            console.log(data.message)
        }else{
            console.log("failed to save")
        }
    }catch(err){
        console.log(err)
    }
    };
    const handleImgchange= async (e) => {
        e.preventDefault();
        const {name,value}=e.target
        if(e.target.files[0]){
        const data = new FormData();
        data.append("file", e.target.files[0]);
        data.append("upload_preset", "xoogiv1f");
        data.append("cloud_name", "dxhukfvxh");
        fetch(
          "https://api.cloudinary.com/v1_1/dxhukfvxh/image/upload",
          {
            method: "POST",
            body: data,
          }
        )
          .then((response) => response.json())
          .then((data) =>
            setProfile((prev) => ({ ...prev, [name]: data.url }))
          );
        }
      }

    return (
        <div className={profileStyle.main_div}>
            <h2>Create Your Profile</h2>
                
        <div className={profileStyle.profile_container}>
            
            <div className={profileStyle.profile_form} >
            <div className={profileStyle.profile_pic_div}>
            <div className={profileStyle.form_profile_pic}>
                    <img src={profile.profileImage ? profile.profileImage : image} alt='img'/>
                    <input type="file" name="profileImage" ref={profileRef} accept="image/*"  style={{display:'none'}}  onChange={(e)=>handleImgchange(e)}/>
                </div>
                <div className={profileStyle.upload_img_div}>
                    <button className={profileStyle.upload_img_btn} onClick={()=>{
                        if(profileRef.current){
                            profileRef.current.click()
                        }
                    }}>Upload Image</button>
                </div>
                </div>
                <div className={profileStyle.additional_img_main_div}>
               
                    <div className={profileStyle.additional_img}>
                        {profile.additionalImage1&&<img className={profileStyle.addImg} src={profile.additionalImage1} alt='img' />}
                        <input type="file" name='additionalImage1' ref={additionalImgRef1} accept="image/*"  style={{display:'none'}}  onChange={(e)=>handleImgchange(e)}/>
                        <img  className={profileStyle.addBtn1}src={addImg} onClick={()=>{
                            if(additionalImgRef1.current){
                                additionalImgRef1.current.click()
                            }
                        }} />
                    </div>
                    <div className={profileStyle.additional_img}>
                        {profile.additionalImage2&&<img className={profileStyle.addImg} src={profile.additionalImage2} alt='img' />}
                        <input type="file" name='additionalImage2' ref={additionalImgRef2} accept="image/*"  style={{display:'none'}}  onChange={(e)=>handleImgchange(e)}/>
                        <img  className={profileStyle.addBtn2}src={addImg} onClick={()=>{
                            if(additionalImgRef2.current){
                                additionalImgRef2.current.click()
                            }
                        }} />
                    </div>
                    <div className={profileStyle.additional_img}>
                        {profile.additionalImage3&&<img className={profileStyle.addImg} src={profile.additionalImage3} alt='img' />}
                        <input type="file" name='additionalImage3' ref={additionalImgRef3} accept="image/*"  style={{display:'none'}}  onChange={(e)=>handleImgchange(e)}/>
                        <img  className={profileStyle.addBtn3}src={addImg} onClick={()=>{
                            if(additionalImgRef3.current){
                                additionalImgRef3.current.click()
                            }
                        }} />
                    </div>
                </div>
                <div className={profileStyle.form_group}>
                    <h4>Bio</h4>
                    <textarea className={profileStyle.textarea} name='bio' onChange={handleInputChange}></textarea>
                </div>
                <div className={profileStyle.form_group}>
                    <label>Dob</label>
                    <input type="date" name="dob" value={profile.dob} onChange={handleInputChange}  />
                </div>
                <div className={profileStyle.form_group}>
                    <label>Age</label>
                    <input type="number" name="age" value={profile.age} onChange={handleInputChange}  />
                </div>
                <div className={profileStyle.form_group}>
                    <label>Gender</label>
                    <select name="gender" value={profile.gender} onChange={handleInputChange} >
                        <option value="">Select...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className={profileStyle.form_group}>
                    <label>Qualification</label>
                    <input type="text" name="qualification" value={profile.qualification} onChange={handleInputChange}  />
                </div>
                <div className={profileStyle.form_group}>
                    <label>Hobbies</label>
                    <input type="text" name="hobbies" value={profile.hobbies} onChange={handleInputChange}  />
                </div>
                <div className={profileStyle.form_group}>
                    <label>Interests</label>
                    <input type="text" name="interests" value={profile.interests} onChange={handleInputChange}  multiple  />
                </div>
                <div className={profileStyle.form_group}>
                    <label>Drinking</label>
                    <select name="drinking" value={profile.drinking} onChange={handleInputChange} >
                        <option value="">Select...</option>
                        <option value="Never">Never</option>
                        <option value="Occasionally">Occasionally</option>
                        <option value="Frequently">Frequently</option>
                    </select>
                </div>
                <div className={profileStyle.form_group}>
                    <label>Smoking</label>
                    <select name="smoking" value={profile.smoking} onChange={handleInputChange} >
                        <option value="">Select...</option>
                        <option value="No">No</option>
                        <option value="Occasionally">Occasionally</option>
                        <option value="Frequently">Frequently</option>
                    </select>
                </div>
                
            </div>
        </div>
        <div className={profileStyle.submit_btn_div}>
            <button type="submit" className={profileStyle.submit_btn} onClick={handleSubmit}>Submit</button>
        </div>
        
        </div>
    );
}

export default ProfileForm;