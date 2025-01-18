import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";

function Layout() {
    return (
        <>
        <Header />
        
            <main className="container margin-top">
                <Outlet />
            </main>

        <footer>2025</footer>
        </>
    );
}

export default Layout;