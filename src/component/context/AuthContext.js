import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [username, setUsername] = useState("")

    const setAuthStatus = (auth, user,username) => {
        setIsAuthenticated(auth);
        setIsUser(user);
        setUsername(username);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isUser,username, setAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
