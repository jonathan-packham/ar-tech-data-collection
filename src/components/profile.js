import React, {useEffect, useState} from 'react';
import SyncLoader from 'react-spinners/SyncLoader';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import artechlogoH from '../assets/artechlogoHorizontal.jpg';
import htsLogo from '../assets/htslogo.jpg';
import {Navbar, Nav, Container} from 'react-bootstrap';

export default function Profile() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    // const [loginStatus, setLoginStatus] = useState(false);
    const [username, setUsername] = useState(null);

    // function checkLoginStatus() {
    //     let login = Cookies.get('loginstatus');
    //     if (login == 'true') {
    //         setLoginStatus(true);
    //         console.log(loginStatus);
    //     } else {
    //         setLoginStatus(false);
    //     }
    // }

    const logout = () => {
        return navigate('/logout');
    }

    const reset = () => {
        return navigate('/reset');
    }

    function getUsername() {
        let temp = Cookies.get('username');
        console.log(temp);
        setUsername(temp);
    }

    async function getUser() {
        getUsername();
        let fetchedUser = [];
        try {
            const passedUsername = {
                username: username,
            }
            const response = await fetch("http://localhost/employeeBackend/getUser.php", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(passedUsername),
            })
            // .then((response) => {
            //     if (response.ok) {
            //         setUser(JSON.parse(response))
            //         Cookies.set("user", user)
            //     }
            //     throw new Error('error')
            // })
            const data = await response.json();
            console.log(data);
            fetchedUser = data.User;
            console.log(fetchedUser);
            setUser(fetchedUser);
            Cookies.set('phone', fetchedUser.Phone);
            Cookies.set('empID', fetchedUser.empID);
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [user])

    const override = `
        display: block;
        margin: 0 auto;
        border-color: red;
    `

    return isLoading ? 
        <div className='Splash-container'>
            <div className='Splash-content'>
                <div className='align-middle'>
                    <SyncLoader color={'#271801'} loading={isLoading} css={override} size={20} />
                    <img src={htsLogo} alt='HTS-Logo' className='HTS-logo' />
                </div>
            </div>
        </div> :
        <div className='Profile-container'>
            <div className='Profile-content'>
                <img src={artechlogoH} alt='Logo' className='Profile-logo-h' />
                <h3 className='Profile-content-title'>User Profile</h3>
                <Navbar collapseOnSelect expand='sm' bg='light' variant='light'>
                    <Container>
                        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                        <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-center'>
                            <Nav>
                                <Nav.Link href='/profile'>Profile</Nav.Link>
                                <Nav.Link href='/forms'>Forms</Nav.Link>
                                <Nav.Link href='/newForm'>Create Form</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div className='Profile-user-stats'>
                    <div className='border rounded mt-2 Profile-text-display'>EmployeeID: {user.empID}</div>
                    <div className='border rounded mt-2 Profile-text-display'>Username: {user.Username}</div>
                    <div className='border rounded mt-2 Profile-text-display'>Name: {user.FirstName} {user.LastName}</div>
                    <div className='border rounded mt-2 Profile-text-display'>Phone: {user.Phone}</div>
                </div>
                <div className='py-2 logout-container'>
                    <button className='m-1 w-50 btn btn-custom' type='button' onClick={reset} >Reset Password</button>
                    <button className='m-1 w-50 btn btn-custom' type='button' onClick={logout} >Logout</button>
                </div>
            </div>
        </div>
}