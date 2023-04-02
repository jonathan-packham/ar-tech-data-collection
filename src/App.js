import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from './components/Auth';
import Logout from './components/logout';
import Profile from './components/profile';
import HazardForm from './components/hazardForm';
import Deactive from './components/deactivated';
import Forms from './components/forms';
import Reset from './components/reset';

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/forms" element={<Forms />} />
                <Route path="/newForm" element={<HazardForm />} />
                <Route path="/deactive" element={<Deactive />} />
                <Route path="/reset" element={<Reset />} />
            </Routes>
        </div>
    );
}

export default App;