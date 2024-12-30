
function handleLogOut() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    window.location.href = '/';
}

export default handleLogOut;