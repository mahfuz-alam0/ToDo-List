import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Home = () => {

    const { user } = useContext(AuthContext);

    return (
        <div>
            {
                !user ? <div className='flex gap-5 justify-center items-center h-screen my-auto'>
                    <Link to='/login' className='p-2 bg-green-500 rounded-md hover:bg-green-700 hover:text-white font-semibold duration-300'>LogIn</Link>
                    <Link className='p-2 bg-green-500 rounded-md hover:bg-green-700 hover:text-white font-semibold duration-300'>SignUp</Link>
                </div> : <div className='flex gap-5 justify-center items-center h-screen my-auto'>
                    <Link className='p-2 bg-green-500 rounded-md hover:bg-green-700 hover:text-white font-semibold duration-300'>Sign Out</Link>
                    <Link className='p-2 bg-green-500 rounded-md hover:bg-green-700 hover:text-white font-semibold duration-300'>SignUp</Link>
                </div>
            }
            
        </div>
    );
};

export default Home;