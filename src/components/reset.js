import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import artechlogoH from '../assets/artechlogoHorizontal.jpg';

export default function Reset() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [passwordType, setPasswordType] = useState("password")
    const [confPassType, setConfPassType] = useState("password")
    const [valid, setValid] = useState("form-control")
    const [visibility, setVisibility] = useState("invalid-feedback invisible")

    const passwordHandler = (event) => {
        event.preventDefault()
        setNewPass(event.target.value)
    }

    const confPassHandler = (event) => {
        event.preventDefault()
        setConfirmPass(event.target.value)
        if (newPass !== confirmPass) {
            setValid("form-control mt-1 is-invalid")
            setVisibility("invalid-feedback visible")
        }
    }

    const togglePassword = (event) => {
        event.preventDefault()
        if (passwordType === "password") {
            setPasswordType("text")
            return
        }
        setPasswordType("password")
    }

    const toggleConfPass = (event) => {
        event.preventDefault()
        if (confPassType === "password") {
            setConfPassType("text")
            return
        }
        setConfPassType("password")
    }

    async function resetRequest() {
        try {
            const response = await fetch('http://localhost/employeeBackend/reset.php', {
                method: 'GET',
                body: JSON.stringify({
                    Username: username,
                    User_Password: newPass,
                }),
            })
                // .then((response) => {
                //     if (response.ok) {
                //         return response.json()
                //     }
                //     throw new Error('error')
                // })
                // .then((data) => {
                //     if (data.status) {
                //         navigate('/')
                //     } else {
                //         // set error
                //     }
                // })
                const data = await response.json();
                console.log(data);
        } catch (error) {
            console.log(error.message)
        }
    }

    const submitHandler = (event) => {
        event.preventDefault()
        if (newPass === confirmPass) {
            resetRequest()
            navigate('/')
        } 
        setValid("form-control mt-1 is-invalid")
        setVisibility("invalid-feedback visible")
        return
    }

    useEffect(() => {
        let temp = Cookies.get('username');
        setUsername(temp);
    }, [])

    return (
        <div className='Auth-form-container'>
            <form className='Auth-form'>
                <div className='Auth-form-content'>
                    <img src={artechlogoH} alt='Logo' className='Auth-logo-h' />
                    <h3 className='Auth-form-title'>Reset Password</h3>
                    <div className='form-group mt-3'>
                        <div className='form-row my-3'>
                            <div className='input-group'>
                                <input 
                                    type='password'
                                    className='form-control'
                                    placeholder='Current Password:'
                                ></input>
                            </div>
                        </div>
                        <div className='form-row my-1'>
                            <div className='input-group'>
                                <input
                                    type={passwordType}
                                    className='form-control'
                                    placeholder='Enter Password:'
                                    onChange={passwordHandler}
                                />
                                <div className='input-group-btn'>
                                    <button className='btn btn-outline-secondary' onClick={togglePassword}>
                                        {passwordType === "password" ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                        </svg>}
                                    </button>
                                </div> 
                            </div>
                        </div>
                        <div className='form-row my-1'>
                            <div className='input-group'>
                                <input
                                    type={confPassType}
                                    className={valid}
                                    placeholder='Confirm Password:'
                                    onChange={confPassHandler}
                                />
                                <div className={visibility}>
                                    Passwords don't match!
                                </div>
                                <div className='input-group-btn'>
                                    <button className='btn btn-outline-secondary' onClick={toggleConfPass}>
                                        {confPassType === "password" ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                        </svg>}
                                    </button>
                                </div> 
                            </div>
                        </div>
                        <div className='d-grid gap-2 mt-2 m2-3 justify-content-center align-self-center'>
                            <button type='submit' className='btn btn-custom' onSubmit={submitHandler}>
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}