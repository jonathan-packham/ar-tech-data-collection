import React, {useState} from 'react';
import {redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import squareLogo from '../assets/squareLogo.jpg';

export default function Home() {
    const [loginStatus, setLoginStatus] = useState(false);

    const checkLoginStatus = () => {
        setLoginStatus(Cookies.get('loggedIn'));
        return loginStatus;
    }

    function navigate(url) {
        return redirect(url);
    }

    return (
        <div className='Home-container'>
            <div className='Home-content'>
                <img src={squareLogo} alt='Logo' className='Home-logo-s' />
                <h3 className='Home-title'>Home</h3>
                <div className='Home-options'>
                    {checkLoginStatus ? (
                        <>
                            <div className='collapse' id='navbarToggler'>
                                <div className='row my-2'>
                                    <div className='col'>
                                        <button className='Nav-btn' type='button' onClick={navigate('/profile')}>Profile</button> 
                                    </div>
                                    <div className='col'>
                                        <button className='Nav-btn' type='button' onClick={navigate('/forms')}>Form Information</button>
                                    </div>
                                    <div className='col'>
                                        <button className='Nav-btn' type='button' onClick={navigate('/newForm')}>New Form</button>
                                    </div>
                                </div>
                            </div>
                            <nav class="navbar navbar-dark bg-dark">
                                <div class="container-fluid">
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                </div>
                            </nav>
                            <div className=''>

                            </div>
                        </>
                    ) : (
                        <>
                            {navigate('/login')}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}