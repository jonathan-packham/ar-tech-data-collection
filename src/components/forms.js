import React, {useEffect, useState} from 'react';
import SyncLoader from 'react-spinners/SyncLoader';
import {useNavigate} from 'react-router-dom';
// import Cookies from 'js-cookie';
import './Components.css';
import "bootstrap/dist/css/bootstrap.min.css";
import squareLogo from '../assets/squareLogo.jpg';
import htsLogo from '../assets/htslogo.jpg';
import {Navbar, Nav, Container} from 'react-bootstrap';

export default function Forms() {
    const navigate = useNavigate();
    // const [loginStatus, setLoginStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState(null);

    // const isLoggedIn = () => {
    //     setLoginStatus(Cookies.get('loginstatus'))
    //     if (loginStatus === true) {
    //         return;
    //     } else {
    //         navigate('/login');
    //     }
    // }

    const logout = () => {
        return navigate('/logout');
    }

    async function getFormData() {
        try {
            let forms = [];
            const response = await fetch("http://localhost/backend/getFormData.php", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application'
                },
            })
            // .then((response) => {
            //     if (response.ok) {
            //         setFormData(JSON.parse(response))
            //     }
            //     throw new Error('error')
            // })
            const data = await response.json();
            forms = data.FormData;
            setFormData(forms);
        } catch (error) {
            console.log(error.message)
        }
    }

    // useEffect(() => {
    //     isLoggedIn();
    // });

    useEffect(() => {
        getFormData();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

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
        <div className='Form-display-container'>
            <div className='Form-display-content'>
                <img src={squareLogo} alt='Logo' className='Form-display-logo-s' />
                <h3 className='Form-display-title'>Form Information</h3>
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
                <div className='Form-display-table-contain'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>Form #</th>
                                <th scope='col'>Job Name: </th>
                                <th scope='col'>Location: </th>
                                <th scope='col'>Date: </th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.map(form => {
                                return (
                                    <tr key={form.FormID}>
                                        <td>{form.FormID}</td>
                                        <td>{form.JobName}</td>
                                        <td>{form.LocationName}</td>
                                        <td>{form.DateTime}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className='logout-container'>
                    <button className='mb-2 w-25 btn btn-custom' type='button' onClick={logout} >Logout</button>
                </div>
            </div>
        </div>
}