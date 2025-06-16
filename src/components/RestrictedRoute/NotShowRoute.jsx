import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router';

const NotShowRoute = ({children}) => {
    const { isLoggedIn, setIsLoggedIn, userId, setUserId } = useContext(AuthContext);
    
    return !isLoggedIn ? children : <Navigate to="/" />
}

export default NotShowRoute
