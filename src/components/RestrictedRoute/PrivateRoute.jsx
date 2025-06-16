import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({children}) => {
    const { isLoggedIn, setIsLoggedIn, userId, setUserId } = useContext(AuthContext);

  return isLoggedIn ? children : <Navigate to="/login" />
}

export default PrivateRoute
