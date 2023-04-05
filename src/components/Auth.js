// importing react components 
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
// importing stylesheet and bootstrap styling
import '../App.css'; 
import "bootstrap/dist/css/bootstrap.min.css";
 //importing logo
import artechlogoH from '../assets/artechlogoHorizontal.jpg';
// 🥲🥸

export default function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [fetchedData, setFetchedData] = useState(null)
    const [passwordType, setPasswordType] = useState("password")
    const [userValid, setUserValid] = useState("form-control mt-1") // sets username box to be red if incorrect
    const [passValid, setPassValid] = useState("form-control mt-1") // sets password box to be red if incorrect
    const [userVis, setUserVis] = useState("invalid-feedback invisible") // alert for incorrect username, hidden by default
    const [passVis, setPassVis] = useState("invalid-feedback invisible") // alert for incorrect password, hidden by default

    // sets username field back to normal and hides alert when the box is clicked, if it had previously been triggered 
    const usernameHandler = () => {
        setUserValid("form-control mt-1")
        setUserVis("invalid-feedback invisible")
    }

    // sets password field back to normal and hides alert when the box is clicked, if it had previously been triggered 
    const passwordHandler = () => {
        setPassValid("form-control mt-1")
        setPassVis("invalid-feedback invisible")
    }

    // sends form data to php script
    const submitHandler = (event) => {
        event.preventDefault();
        loginRequest();
    }

    // function to toggle password hidden or visible
    const togglePassword = (event) => {
        event.preventDefault()
        if (passwordType === "password") {
            setPasswordType("text")
            return
        }
        setPasswordType("password")
    }

    // function that sends a request to the login.php script to validate the user
    async function loginRequest() {
        try {
            const userData = {
                Username: user,
                User_Password: pass,
            };
            const response = await fetch("http://localhost/employeeBackend/login.php", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
            // .then((response) => {
            //     return response.json() 
            // }).then((json) => {
            //     console.log(json)
            //     setFetchedData(JSON.parse(json))
            //     isLogonSuccessful()
            // })
            const data = await response.json();
            //console.log(data);
            setFetchedData(data.User);
            console.log(fetchedData);
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        if (fetchedData != null) {
            isLogonSuccessful();
        }
    })

    // function to direct user depending on results of sql query
    function isLogonSuccessful() {
        console.log('logon success')
        if (fetchedData.status === "Innactive") {
            navigate("/deactive")
        }
        if (user === fetchedData.Username && pass === fetchedData.User_Password) {
            Cookies.set('loginstatus', true)
            Cookies.set('username', user.toString())
            navigate("/profile")
        } else if (user !== fetchedData.Username && pass === fetchedData.User_Password) {
            setUserValid("form-control mt-1 is-invalid")
            setUserVis("invalid-feedback visible")
            return
        } else if (user === fetchedData.Username && pass !== fetchedData.User_Password) {
            setPassValid("form-control mt-1 is-invalid")
            setPassVis("invalid-feedback visible")
            return
        } else {
            setPassValid("form-control mt-1 is-invalid")
            setPassVis("invalid-feedback visible")
            setUserValid("form-control mt-1 is-invalid")
            setUserVis("invalid-feedback visible")
            return
        }
    }

    return (
        <div className='Auth-form-container'>
            <form className='Auth-form'>
                <div className='Auth-form-content'>
                    <img src={artechlogoH} alt='Logo' className='Auth-logo-h' />
                    <h3 className='Auth-form-title'>Sign In</h3>
                    <div className='form-group mt-3'>
                        <label>Username:</label>
                        <input
                            type='username'
                            className={userValid}
                            placeholder='Enter Username:'
                            onChange={e => setUser(e.target.value)}
                            onClick={usernameHandler}
                        />
                        <div className={userVis}>
                            Username is incorrect.
                        </div>
                    </div>
                    <div className='form-group mt-3'>
                        <label>Password: </label>
                        <div className='form-row'>
                            <div className='input-group'>
                                <input
                                    type={passwordType}
                                    className={passValid}
                                    placeholder='Enter Password:'
                                    onChange={e => setPass(e.target.value)}
                                    onClick={passwordHandler}
                                />
                                <div className='input-group-btn mt-1'>
                                    <button className='btn btn-outline-secondary' onClick={togglePassword}>
                                        {passwordType === "password" ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                        </svg>}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={passVis}>
                            Password incorrect.
                        </div>
                    </div>
                    <div className='d-grid gap-2 mt-2 m2-3 justify-content-center align-self-center'>
                        <button type='submit' className='btn btn-custom' onClick={submitHandler}>
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}