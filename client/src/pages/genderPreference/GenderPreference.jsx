import React, { useState } from 'react';
import genderStyle from "./genderPreference.module.css"
import { useNavigate } from 'react-router-dom';
const GenderPreference = () => {
    const navigate=useNavigate()
  const [genderPreference, setGenderPreference] = useState(''); 
  
  const handleGenderPreferenceChange = (event) => {
    setGenderPreference(event.target.value);
  };
    
  const handleSubmit = async () => {
    console.log("hi")
    if(!genderPreference) return
    console.log("hello")
    try {
      const response = await fetch('http://localhost:8000/update-gender-pref', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Authorization':`Bearer ${localStorage.getItem("jwtToken")}`
        },
        body: JSON.stringify({ genderPreference }),
      });
      console.log(response)
      if (response.ok) {
        navigate("/home")
      } 
    } catch (error) {
      console.error('Error updating profile:', error);

    }
    console.log(genderPreference)
  };

  return (
    <div className={genderStyle.profile_settings}>
      <label className={genderStyle.label}>Select Gender Preference:</label>
      <div className={genderStyle.radio_group}>
        <label>
          <input
            type="radio"
            value="Male"
            checked={genderPreference === 'Male'}
            onChange={handleGenderPreferenceChange}
          />
          Men
        </label>
        <label>
          <input
            type="radio"
            value="Female"
            checked={genderPreference === 'Female'}
            onChange={handleGenderPreferenceChange}
          />
          Women
        </label>
        <label>
          <input
            type="radio"
            value="Both"
            checked={genderPreference === 'Both'}
            onChange={handleGenderPreferenceChange}
          />
          Both
        </label>
      </div>
      <button className={genderStyle.button} onClick={handleSubmit}>Save Preference</button>
    </div>
  );
};

export default GenderPreference;