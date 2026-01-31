import { Link} from "react-router-dom";
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
        {auth.token ? (
            <Link to="/" onClick={handleLogout}>
                    Log Out
            </Link>
            ) : (
            <Link to="/login">Login</Link>
        )}
        </li>
        </ul>
        </nav>
    </div>
    );
}

export default NavBar;