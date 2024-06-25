import React, { useEffect, useRef, useState } from 'react';
import profileStyle from './profile.module.css';
import image  from "../../assets/no-profile-picture-icon-35.png"
import sampleImg from "../../assets/tron-le-GeqFOv3VGzs-unsplash.jpg"
import addImg from "../../assets/kisspng-linkedin-computer-icons-logo-vector-graphics-user-in-addition-svg-vector-icon-free-icons-uihere-5d1f3d583dcce5.7266464015623284082532.png"
function ProfileForm() {
    const profileRef=useRef(null)
    const additionalImgRef1=useRef(null)
    const additionalImgRef2=useRef(null)
    const [profile, setProfile] = useState({
        name: '',
        age: '',
        occupation: '',
        qualification: '',
        hobbies: '',
        drinking: '',
        smoking: '',
        profileImage: "",
        additionalImages1:"" ,
        additionalImages2:"",
        video: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'mainImage' || name === 'video') {
            setProfile({ ...profile, [name]: files[0] });
        } else {
            setProfile({ ...profile, [name]: Array.from(files) });
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle form submission, like sending data to a server
        console.log(profile);
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
            
            <form className={profileStyle.profile_form} onSubmit={handleSubmit}>
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
                        {profile.additionalImages1&&<img className={profileStyle.addImg} src={profile.additionalImages1} alt=' ' />}
                        <input type="file" name='additionalImages1' ref={additionalImgRef1} accept="image/*"  style={{display:'none'}}  onChange={(e)=>handleImgchange(e)}/>
                        <img  className={profileStyle.addBtn1}src={addImg} onClick={()=>{
                            if(additionalImgRef1.current){
                                additionalImgRef1.current.click()
                            }
                        }} />
                    </div>
                    <div className={profileStyle.additional_img}>
                        {profile.additionalImages2&&<img className={profileStyle.addImg2} src={profile.additionalImages1} alt=' ' />}
                        <input type="file" name='additionalImages2' ref={additionalImgRef2} accept="image/*"  style={{display:'none'}}  onChange={(e)=>handleImgchange(e)}/>
                        <img  className={profileStyle.addBtn2}src={addImg} onClick={()=>{
                            if(additionalImgRef2.current){
                                additionalImgRef2.current.click()
                            }
                        }} />
                    </div>
                    <div className={profileStyle.additional_img}>
                        {profile&&<img className={profileStyle.addImg} src={"profile.additionalImages1"} alt=' ' />}
                        <input type="file" name='additionalImages3'  accept="image/*"  style={{display:'none'}}  onChange={(e)=>handleImgchange(e)}/>
                        <img  className={profileStyle.addBtn3}src={addImg} />
                    </div>
                </div>
                <div className={profileStyle.form_group}>
                    <h4>Bio</h4>
                    <textarea className={profileStyle.textarea} required></textarea>
                </div>
                <div className={profileStyle.form_group}>
                    <label>Name</label>
                    <input type="text" name="name" value={profile.name} onChange={handleInputChange}  />
                </div>
                <div className={profileStyle.form_group}>
                    <label>Age</label>
                    <input type="number" name="age" value={profile.age} onChange={handleInputChange}  />
                </div>
                <div className={profileStyle.form_group}>
                    <label>Occupation</label>
                    <input type="text" name="occupation" value={profile.occupation} onChange={handleInputChange} />
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
                    <label>Intrests</label>
                    <input type="text" name="intrests" onChange={handleInputChange}  multiple  />
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
               
                
                <div className={profileStyle.form_group}>
                    <label>Location</label>
                    <input type="text" name="location=" onChange={handleInputChange}   />
                </div>
                
            </form>
        </div>
        <div className={profileStyle.submit_btn_div}>
            <button type="submit" className={profileStyle.submit_btn}>Submit</button>
        </div>
        
        </div>
    );
}

export default ProfileForm;