import React from 'react';
import googlebtnStyle from "./googleLoginBtn.module.css"

const LoginButton = () => {


  const handleLoginClick = () => {
    window.open("http://localhost:8000/auth/google/callback","_self") 

  };

  return (
    <button className={googlebtnStyle.google_login_btn} onClick={handleLoginClick}>Login with Google</button>
  );
};

export default LoginButton;