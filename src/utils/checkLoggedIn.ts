function checkUserLoggedIn() {
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');
    
    if (token && username) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload.exp * 1000 < Date.now(); 
        
        if (isExpired) {
            return false;
        }

        return true;
    } 
    
    return false;
}

export default checkUserLoggedIn;