import {Outlet} from "react-router-dom";
import NavBar from "./NavBar";

function Layout() {
    return (
    <div>
        <img src="./src/assets/img/logo.jpg" width="100" height ="100"/>
    <NavBar />
    <Outlet />
    <footer>By Michaela Gyasi-Agyei</footer>
    </div>
    );
}

export default Layout;