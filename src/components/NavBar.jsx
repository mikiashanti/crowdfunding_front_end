import {Link} from "react-router-dom";
import useAuth from "../hooks/use-auth.js";

function NavBar() {
    const {auth, setAuth} = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        setAuth({ token: null });
    };

    return (
    <div>
        <nav>
            <ul>
            <li>
        <Link to="/">Home</Link>
        </li>
        <li>
        {auth.token ? (
            <Link to="/" onClick={handleLogout}>
                    Log Out
            </Link>
            ) : (
            <Link to="/login">Login</Link>
        )} or <Link to="/signup">Sign up</Link>
        </li>
        <li>
        <Link to="/create">Create Fundraiser</Link>
        </li>
        <li>
        <Link to="/pledge">Make a Pledge</Link>
        </li>
        
        </ul>
        </nav>
    </div>
    );
}

export default NavBar;