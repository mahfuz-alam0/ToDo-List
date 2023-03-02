import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)

    const [isAdmin] = useAdmin(user?.email);

    const handleLogOut = () => { 
        logOut()
            .then(() => {
                localStorage.removeItem('access_token')
            })
    }
    
    return (
        <div>
            <ul className='flex justify-center gap-4'>
                <li className='p-3 bg-green-500 rounded-md'><Link to='/home/create'>Create List</Link></li>
                <li className='p-3 bg-green-500 rounded-md'><Link to='/home/view'>View List</Link></li>
                <li className='p-3 bg-green-500 rounded-md'><Link to='/home/update'>Update</Link> </li>
                {
                    isAdmin && <li className='p-3 bg-green-500 rounded-md'><Link to='/home/all-list'>All List</Link></li>
                }
                <li className='p-3 bg-green-500 rounded-md'><button onClick={handleLogOut}>LogOut</button></li>
            </ul>
        </div>
    );
};

export default Navbar;