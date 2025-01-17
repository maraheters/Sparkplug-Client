import { whoAmIRequest } from "../api/sparkplugApi";

async function checkUserLoggedIn() {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        return false;
    }

    try {
        await whoAmIRequest(token);
        return true;
    } catch (e) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        return false;
    }

}

export default checkUserLoggedIn;