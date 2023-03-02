import React from 'react';
import { Outlet } from 'react-router-dom';
import Home from '../Home/Home';
import Navbar from '../Pages/Navbar/Navbar';

const Main = () => {
    return (
        <div className='min-h-screen'>
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default Main;