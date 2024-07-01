import { useState } from "react";
import style from "./register.module.css"
import LoginButton from "../../component/GoogleLoginBtn";
import { useNavigate } from "react-router-dom";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import "./register.css"
function Register_screen(){
  const navigate=useNavigate()
    const[userData,setUserData]=useState({
        first_name:"",
        last_name:"",
        contact:"",
        email:"",
        password:""
    })
    const [valid,setValid]=useState("")
    const[otpTrue,setOtpTrue]=useState({
        otp:"",
        condition:false
    })
    const cleanPhoneNumber = (phone) => {
        return phone.replace(/[^\d+]/g, '');
      };
    const isValid=()=>{
        if(!userData.first_name || !userData.last_name || !userData.contact || !userData.email || !userData.password){
           setValid("All fields are mandatory")
            return false
        }
        else if(/[0-9]/.test(userData.first_name) ||/[0-9]/.test(userData.last_name)){
            setValid("Name must be alphabet")
            return false
        }
        else if(userData.email.indexOf("@")==-1){
            setValid("Enter a valid email")
            return false
        }
        else if(/[a-zA-z]|\s+/.test(userData.contact)){
            setValid("Phone number must contain only digits")
            return false
        }
        else if(userData.password.length<6){
            setValid("Password must contain atleast 6 letters")
            return false
        }
        setValid("")
        return true
    }
    return <>
    <div className={style.main_div}>
        {!otpTrue.condition ? <div className={`${style.register_body}`}>
            <h4 className={`${style.register_head}`}>Sign up</h4>
            <div className="register-form">
                {valid && <div className={`${style.errmsg}`}>{valid}</div>}
                <div className={`${style.form_input_div}`}>
                <input placeholder="First Name" value={userData.first_name} onChange={(e)=>{setUserData({...userData,first_name:e.target.value})}}/>
                <input placeholder="Last Name" value={userData.last_name} onChange={(e)=>{setUserData({...userData,last_name:e.target.value})}}/>
                <input placeholder="Email" value={userData.email} onChange={(e)=>{setUserData({...userData,email:e.target.value})}}/>
                <PhoneInput containerClass={style.phoneInputContainer}  country={'in'} enableSearch  placeholder="Contact" value={userData.contact} onChange={(phone)=>{setUserData({...userData,contact:phone})}}/>
                <input placeholder="Password" type="password" value={userData.password} onChange={(e)=>{setUserData({...userData,password:e.target.value})}}/>
                </div>
            </div>
            <div className={style.submit_btn_div}>
                <button className={style.submit_btn} onClick={async(e)=>{
                    e.preventDefault()
                    if(!isValid()) return
                    const cleanedContact = await cleanPhoneNumber(userData.contact);
                    try{
                    const response=await fetch("http://localhost:8000/registration",
                        {
                            method:"POST",
                            headers:{
                                'Content-Type':'application/json'
                            },
                        body :JSON.stringify({...userData,contact:`+${cleanedContact}`})})
                        const data=await response.json()
                        if(response.ok){
                            setOtpTrue({
                                ...otpTrue,
                                condition:true
                            })
                            
                        }
                        else{
                            setValid(data.message)
                        }
                    }
                    
                    catch(err){
                        console.error('Error in axios request:', err);
                    }
                }

                }>Register</button>
            </div>
            <div>
            <LoginButton />
            </div>
        </div>:
         <div className={style.otp_section}>
            {valid && <div className={`${style.errmsg}`}>{valid}</div>}
            <input type="text" placeholder="Enter OTP" onChange={(e)=>{setOtpTrue({
                ...otpTrue,
                otp:e.target.value
            })}}/>
            <div>
                <button onClick={async()=>{
                    setValid("")
                    const response=await fetch("http://localhost:8000/registration/verify",{
                        method:"POST",
                        headers:{
                            'Content-type':'application/json'
                        },
                        body:JSON.stringify({
                            otp:otpTrue.otp
                        })

                    })
                    const data=await response.json()
                    if(response.ok){
                        localStorage.setItem("jwtToken",data.token)
                        navigate("/profile")

                    }
                    else{
                        setValid(data.message)
                    }
                }}>submit</button>
            </div>
         </div>
        }
        </div>
    </>
}
export default Register_screen;