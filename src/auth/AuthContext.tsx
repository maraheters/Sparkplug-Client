import React, { createContext, useContext, useEffect, useState } from "react";
import { UserAuth } from "../api/sparkplugModels";
import { useNavigate } from "react-router-dom";
import { loginRequest, registerRequest } from "../api/sparkplugAuthApi";
import toast from "react-hot-toast";

type UserContextType = {
    userAuth: UserAuth | null;
    registerUser: (username: string, password: string) => void;
    loginUser: (username: string, password: string) => void;
    logoutUser: () => void;
    isLoggedIn: () => boolean;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

type Props = { children: React.ReactNode };

export const AuthProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [userAuth, setUser] = useState<UserAuth | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("userAuth");
        if (user) {
            setUser(JSON.parse(user));
        }

        setIsReady(true);
    }, []);

    const registerUser = async (username: string, password: string) => {
        try{
            const response = await registerRequest(username, password);
            setUser(response);
            localStorage.setItem("userAuth", JSON.stringify(response));
            toast.success("Registered successfully!");
            navigate("/");
        } catch (error) {
            toast.error("Failed to register.");
        }
    };   

    const loginUser = async (username: string, password: string) => {
        try{
            const response = await loginRequest(username, password);
            setUser(response);
            localStorage.setItem("userAuth", JSON.stringify(response));
            toast.success("Logged in successfully!");
            navigate("/");
        } catch (error) {
            toast.error("Failed to login.");
        }
    }; 

    const logoutUser = () => {
        localStorage.removeItem("userAuth");
        setUser(null);
        navigate("/");
    }

    const isLoggedIn = () => {
        return !!userAuth;
    }

    return (
        <UserContext.Provider value={{ userAuth, registerUser, loginUser, logoutUser, isLoggedIn }}>
            {isReady ? children : <p>Loading...</p>}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);