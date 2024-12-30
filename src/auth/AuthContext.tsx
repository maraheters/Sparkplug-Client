import React, { createContext, useContext, useState, useEffect } from 'react';
import { whoAmIRequest } from '../api/sparkplugApi';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

export enum AuthStatus {
    Loading,
    SignedIn,
    SignedOut,
}

export interface IAuth {
    authStatus?: AuthStatus;
    signIn?: any;
    signOut?: any;
}

const defaultState: IAuth = {
    authStatus: AuthStatus.Loading,
};
  
type Props = {
    children?: React.ReactNode;
};

export const AuthContext = React.createContext(defaultState);

export const AuthIsSignedIn = () => {
    const { authStatus }: IAuth = useContext(AuthContext);
    if (authStatus === AuthStatus.Loading) return null;
    return authStatus === AuthStatus.SignedIn ? <Outlet /> : null;
};

export const AuthIsNotSignedIn = () => {
    const { authStatus }: IAuth = useContext(AuthContext);
    if (authStatus === AuthStatus.Loading) return null;
    return authStatus === AuthStatus.SignedOut ? <Outlet /> : null;
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
                setAuthStatus(AuthStatus.SignedIn);
            } catch (e) {
                setAuthStatus(AuthStatus.SignedOut);
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
        return null;
    }
  
    return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
  };

  export default AuthProvider;