import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        Cookies.remove('username');
        Cookies.remove('phone');
        Cookies.remove('empID');
        return navigate('/login');
    })
}