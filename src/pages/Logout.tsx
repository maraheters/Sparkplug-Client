import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('username');
            localStorage.removeItem('userId');
            toast('Logged out successfully');
            navigate('/');
        };

        logout();
    });

    return(<></>);
};

export default Logout;