import React from 'react';
import { useNavigate } from 'react-router-dom';
import matrimonyStyles from './matrimony_prompt.module.css';

function MatrimonyPrompt() {
    const navigate = useNavigate();

    return (
        <div className={matrimonyStyles.promptContainer}>
            <h1>Do you want to go to the Matrimony section?</h1>
            <div className={matrimonyStyles.buttonGroup}>
                <button className={matrimonyStyles.yesButton} >Yes</button>
                <button className={matrimonyStyles.noButton} onClick={()=>{
                    navigate('/profile');
                }}>No</button>
            </div>
        </div>
    );
}

export default MatrimonyPrompt;