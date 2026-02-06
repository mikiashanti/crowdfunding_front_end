import {Outlet} from "react-router-dom";
import NavBar from "./NavBar";

function Layout() {
    return (
    <div>
        <img src="./src/assets/img/logo.jpg" width="150" height ="150"/>
    <NavBar />
    <Outlet />
    <footer>© 2026 Michaela Gyasi-Agyei</footer>
    </div>
    );
}

export default Layout;