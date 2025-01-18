import React, { useContext, useState, useEffect } from 'react';
import { whoAmIRequest } from '../api/sparkplugApi';
import { Outlet } from 'react-router-dom';

export enum AuthStatus {
    Loading,
    SignedIn,
    SignedOut,
}

export interface IAuth {
    authStatus?: AuthStatus;
    signIn?: () => void;
    signOut?: () => void;
}

const defaultState: IAuth = {
    authStatus: AuthStatus.Loading,
};
  
type Props = {
    children?: React.ReactNode;
};

const AuthContext = React.createContext(defaultState);

export const AuthIsSignedIn = () => {
    const { authStatus }: IAuth = useContext(AuthContext);

    if (authStatus === AuthStatus.Loading) 
        return <div>Loading...</div>;

    return authStatus === AuthStatus.SignedIn 
        ? <Outlet /> 
        : <div>Not signed in</div>;
};

export const AuthIsNotSignedIn = () => {
    const { authStatus }: IAuth = useContext(AuthContext);

    if (authStatus === AuthStatus.Loading) 
        return <div>Loading...</div>;

    return authStatus === AuthStatus.SignedOut 
        ? <Outlet /> 
        : <div>Bruh</div>;
};

const AuthProvider = ({ children }: Props) => {
    const [authStatus, setAuthStatus] = useState(AuthStatus.Loading);
  
    useEffect(() => {
        async function getWhoAmI() {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setAuthStatus(AuthStatus.SignedOut);
                return;
            }
            try {
                await whoAmIRequest(token);
                console.log('Signed in');
                setAuthStatus(AuthStatus.SignedIn);
            } catch (e) {
                setAuthStatus(AuthStatus.SignedOut);
                console.log('Failed to sign in');
            }
        }

        getWhoAmI().then();
    }, [setAuthStatus, authStatus]);
  
    function signIn() {
        setAuthStatus(AuthStatus.SignedIn);
    }
  
    function signOut() {
        setAuthStatus(AuthStatus.SignedOut);
    }
  
    const state: IAuth = {
        authStatus,
        signIn,
        signOut,
    };
  
    if (authStatus === AuthStatus.Loading) {
        console.log('Loading');
        return <div>Loading...</div>;
    }
  
    return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;