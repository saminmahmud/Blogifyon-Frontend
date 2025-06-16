import { createContext, useState } from "react";
import { getAuthUser, isAuthenticated } from "../auth/auth";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState( isAuthenticated() );
    const [userId, setUserId] = useState( getAuthUser() );

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};
