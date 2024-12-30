import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error('No token found');
                }
                localStorage.removeItem('authToken');
                localStorage.removeItem('username');
                navigate('/');
            } catch (error) {
                console.error('Error logging out:', error);
            }
        };

        logout();
    });

    return(<></>);
};

export default Logout;