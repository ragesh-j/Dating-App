import React, { useEffect, useState } from 'react';
import Purposestyles from './purpose.module.css';
import { useNavigate } from 'react-router-dom';

function RelationshipPurpose() {
    const [purpose, setPurpose] = useState('');
    const navigate=useNavigate()
    const handlePurposeChange = (e) => {
        setPurpose(e.target.value);
    };


  

    return (
        <div className={Purposestyles.purposeContainer}>
            <h3>Purpose of Using This App</h3>
            <div className={Purposestyles.radioGroup}>
                <label>
                    <input
                        type="radio"
                        value="Short Term Relationship"
                        checked={purpose === 'Short Term Relationship'}
                        onChange={handlePurposeChange}
                    />
                    Short Term Relationship
                </label>
                <label>
                    <input
                        type="radio"
                        value="Long Term Relationship"
                        checked={purpose === 'Long Term Relationship'}
                        onChange={handlePurposeChange}
                    />
                    Long Term Relationship
                </label>
            </div>
            <div className={Purposestyles.submit_btn_div}>
                <button className={Purposestyles.submit_btn} onClick={()=>{
                    if(purpose=='Short Term Relationship'){
                        navigate("/genderPreference")
                    }
                    else if(purpose=='Long Term Relationship'){
                        navigate('/matrimony-splash')
                    }
                }}>Submit</button>
            </div>
        </div>
    );
}

export default RelationshipPurpose;