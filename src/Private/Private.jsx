import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Loading } from '../Loading/Loading';

const Private = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    
    if (loading) {

        return <div className='min-h-screen flex justify-center'><Loading /></div>
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default Private;