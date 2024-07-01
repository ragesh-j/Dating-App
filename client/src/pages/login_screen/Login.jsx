import { useState } from "react"
import loginStyle from "./login.module.css"
import LoginButton from "../../component/GoogleLoginBtn";
import { useNavigate } from "react-router-dom";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import "../register_screen/register.css"
function Login(){
    const navigate=useNavigate()
    const[userLoginData,setUserLoginData]=useState({
        contact:"",
        password:""
    })
    const[validLogin,setValidLogin]=useState("")
    return <>
    <div className={loginStyle.main_div}>
    <div className={loginStyle.login_body}>
            <div className={loginStyle.login_form}>
                <h2 className={`${loginStyle.login_head}`}>Log In</h2>
                 {validLogin && <div className={`${loginStyle.errmsg}`}>{validLogin}</div>} 
                <div className={`${loginStyle.form_input_div}`}>
                <PhoneInput containerClass={loginStyle.phoneInputContainer}  country={'in'} enableSearch  placeholder="Contact" value={userLoginData.contact} onChange={(phone)=>{setUserLoginData({...userLoginData,contact:phone})}}/>
                <input placeholder="Password" type="password" value={userLoginData.password} onChange={(e)=>{setUserLoginData({...userLoginData,password:e.target.value})}}/>
                </div>
            </div>
            <div className={loginStyle.submit_btn_div}>
                <button className={loginStyle.submit_btn} onClick={async(e)=>{
                    e.preventDefault()
                    try{
                    const response=await fetch("http://localhost:8000/signin",
                        {
                            method:"POST",
                            headers:{
                                'Content-Type':'application/json'
                            },
                        body :JSON.stringify(userLoginData)})
                        const data=await response.json()
                        if(response.ok){
                            
                            localStorage.setItem("jwtToken",data.token)
                            navigate("/home")
                        
                        }
                        else{
                            setValidLogin(data.message)
                        }
                    }
                    
                    catch(err){
                        console.error('Error in axios request:', err);
                    }}}> submit</button>
                </div>
                <div>
                    <LoginButton />
                </div>
                </div>
                </div>
    </>
}
export default Login