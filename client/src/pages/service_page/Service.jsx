import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import serviceStyle from './service.module.css'
function ServiceSelection() {
 const navigate=useNavigate()

  const handleServiceClick = (service) => {
    navigate(`/${service}`);
  };
  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('jwtToken', token);
    }
  },[])

  return (
    <div className={serviceStyle.service_selection_container}>
      <h1>Select a Service</h1>
      <div className={serviceStyle.service_buttons}>
        <button onClick={() => handleServiceClick('home')}>Dating</button>
        <button onClick={() => handleServiceClick('eCommerce-home')}>eCommerce</button>
        <button onClick={() => handleServiceClick('jobportal')}>Job Portal</button>
        <button onClick={() => handleServiceClick('matrimony-home')}>Matrimony</button>
        <button onClick={() => handleServiceClick('studyabroad')}>Study Abroad</button>
      </div>
    </div>
  );
}

export default ServiceSelection;