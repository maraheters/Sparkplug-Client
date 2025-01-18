import React, { useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

const Logout: React.FC = () => {
    const {logoutUser} = useAuth();

    useEffect(() => {
        logoutUser();
    },[]);

    return(<></>);
};

export default Logout;