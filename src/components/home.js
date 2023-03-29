import React, {useEffect, useState} from 'react';
//import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import SyncLoader from 'react-spinners/SyncLoader';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import squareLogo from '../assets/squareLogo.jpg';
import htsLogo from '../assets/htslogo.jpg';
import {Navbar, Nav, Container} from 'react-bootstrap';

export default function Home() {
    //const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [loginStatus, setLoginStatus] = useState(false);

    const isLoggedIn = () => {
        setLoginStatus(Cookies.get('loginstatus'));
        console.log(loginStatus);
        if (loginStatus === true) {
            return;
        } else {
            return;
        }
    }
    useEffect(() => {
        isLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
    }, [loginStatus]);

    const override = `
        display: block;
        margin: 0 auto;
        border-color: red;
    `

    return isLoading ? 
        <div className='Splash-container'>
            <div className='Splash-content'>
                <div className='h-100 w-100'>
                    <SyncLoader color={'#271801'} loading={isLoading} css={override} size={20} />
                    <img src={htsLogo} alt='HTS-Logo' className='HTS-logo' />
                </div>
            </div>
        </div> : 
        <div className='Home-container'>
            <div className='Home-content'>
                <img src={squareLogo} alt='Logo' className='Home-logo-s' />
                <h3 className='Home-title'>Home</h3>
                <div className='Home-options'>
                    <Navbar collapseOnSelect expand='sm' bg='light' variant='light'>
                        <Container>
                            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                            <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-center'>
                                <Nav>
                                    <Nav.Link href='/home'>Home</Nav.Link>
                                    <Nav.Link href='/profile'>Profile</Nav.Link>
                                    <Nav.Link href='/forms'>Forms</Nav.Link>
                                    <Nav.Link href='/newForm'>Create Form</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <div className='Home-job-holder'>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
}