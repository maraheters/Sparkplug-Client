import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(isAuthenticated => isAuthenticated = !!token); // Check if token exists
        console.log("Token found:", token);
        console.log("Is Authenticated:", isAuthenticated);
    }, []);

    const login = () => setIsAuthenticated(isAuthenticated => isAuthenticated = true);
    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    console.log("useAuth");
    console.log(context);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};