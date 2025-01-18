import { UserAuth } from "./sparkplugModels";

const API_URL = "http://localhost:8080/auth";

const whoAmIRequest = async (token: string): Promise<UserAuth> => {
    const response = await fetch(`${API_URL}/authenticate`, {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    });
    
    if(!response.ok) {
        throw new Error(`${response.statusText}`);
    }

    const data = await response.json();
    return data;
};

const registerRequest = async (username: string, password: string): Promise<UserAuth> => {
    const response = await fetch(`${API_URL}/register?username=${username}&password=${password}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }
    const data = await response.json();
    return data;
};

const loginRequest = async (username: string, password: string): Promise<UserAuth> => {
    const response = await fetch(`${API_URL}/login?username=${username}&password=${password}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const data = await response.json();
    return data;
};

export { 
    whoAmIRequest,
    registerRequest,
    loginRequest
 };