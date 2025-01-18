import { Link, Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { useAuth } from "./auth/AuthContext";

function Layout() {
    const {isLoggedIn, userAuth} = useAuth();
    
    return (
        <>
        <Header 
            profileButton={ isLoggedIn()
                ? <Link to="/profile">{userAuth?.username}</Link>
                : <Link to="/login">Log in</Link>
            }
        />
        
        <main className="container margin-top">
            <Outlet />
        </main>

        <footer>2025</footer>
        </>
    );
}

export default Layout;