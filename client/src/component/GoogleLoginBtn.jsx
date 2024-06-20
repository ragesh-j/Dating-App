import React from 'react';


const LoginButton = () => {


  const handleLoginClick = () => {
    window.location.href = 'http://localhost:8000/auth/google'; 

  };

  return (
    <button onClick={handleLoginClick}>Login with Google</button>
  );
};

export default LoginButton;