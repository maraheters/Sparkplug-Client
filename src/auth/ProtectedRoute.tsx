import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        console.log("not authenticated")
        return <Navigate to="/login" replace />;
    } else {
        console.log("authenticated");
    }

    return <>{children}</>;
};

export default ProtectedRoute;