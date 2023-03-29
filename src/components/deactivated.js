import React from 'react';
import './Components.css';
import artechlogoH from '../assets/artechlogoHorizontal.jpg';

export default function Deactive() {
    return (
        <div className='Deactive-container'>
            <div className='Deactive-content'>
                <img src={artechlogoH} alt='Logo' className='Deactive-logo-h' />
                <div className='alert alert-danger' role='alert'>
                    Your account has been deactivated, please contact your supervisor to be reactivated.
                </div>
            </div>
        </div>
    )
}