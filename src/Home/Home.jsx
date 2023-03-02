import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Navbar from '../Pages/Navbar/Navbar';

const Home = () => {

    const { user } = useContext(AuthContext);

    if (user) {
        
    }

    return (
        <div >
            this is home
        </div>
    );
};

export default Home;