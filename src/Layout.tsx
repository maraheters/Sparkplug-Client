import { Link, Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { useAuth } from "./context/AuthContext";
import Footer from "./components/Footer/Footer";
import UserDropdown from "./components/UserDropdown/UserDropdown";

function Layout() {
    const {isLoggedIn, userAuth} = useAuth();
    
    return (
        <>
        <Header 
            profileButton={ isLoggedIn()
                ? <UserDropdown/>
                : <Link to="/login">Log in</Link>
            }
        />
        
        <main className="container margin-top">
            <Outlet />
        </main>

        <Footer/>
        </>
    );
}

export default Layout;