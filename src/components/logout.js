import {useEffect} from 'react';
import {redirect} from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Logout() {
    useEffect(() => {
        Cookies.remove('loggedIn');
        return redirect('/login');
    })
}