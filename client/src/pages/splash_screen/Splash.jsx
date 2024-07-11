import React, { useEffect } from 'react';
import splashStyle from './splash.module.css';
import { useNavigate } from 'react-router-dom';


function Splash() {
    const navigate=useNavigate()
    useEffect(() => {
        
        if (localStorage.getItem('jwtToken')) {
          navigate('/service');
        }
      }, [navigate]);
    return (
        <div className={splashStyle.splash_wrapper}>
            <div className={splashStyle.splash_content}>
                <h1>Welcome to Our Community App</h1>
                <p>Connect, Share, and Grow with like-minded individuals.</p>
                <button className={splashStyle.get_started_btn} onClick={()=>{
                    navigate("/register")
                }}>Get Started</button>
            </div>
        </div>
    );
}

export default Splash;