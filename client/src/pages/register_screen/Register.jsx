import { useState } from "react";
import style from "./register.module.css"
import LoginButton from "../../component/GoogleLoginBtn";
function Register_screen(){
    const[userData,setUserData]=useState({
        first_name:"",
        last_name:"",
        contact:"",
        email:"",
        password:""
    })
    return <>
        <div className="register-body">
            <div className="register-form">
                <h2 className={`${style.register_head}`}>Register</h2>
                <div className={`${style.form_input_div}`}>
                <input placeholder="First Name" value={userData.first_name} onChange={(e)=>{setUserData({...userData,first_name:e.target.value})}}/>
                <input placeholder="Last Name" value={userData.last_name} onChange={(e)=>{setUserData({...userData,last_name:e.target.value})}}/>
                <input placeholder="Email" value={userData.email} onChange={(e)=>{setUserData({...userData,email:e.target.value})}}/>
                <input placeholder="Contact" value={userData.contact} onChange={(e)=>{setUserData({...userData,contact:e.target.value})}}/>
                <input placeholder="Password" value={userData.password} onChange={(e)=>{setUserData({...userData,password:e.target.value})}}/>
                </div>
            </div>
            <div className="submit-btn-div">
                <button className="submit-btn" onClick={(e)=>{
                    e.preventDefault()
                    console.log(userData)}}>Register</button>
            </div>
            <div>
            <LoginButton />
            </div>
        </div>
    </>
}
export default Register_screen;