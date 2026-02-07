import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import logo from "../assets/img/logo.jpg"; // Vite-friendly import

function Layout() {
  return (
    <div>
      {/* Header container */}
      <div style={{ display: "flex", alignItems: "center", padding: "0.5rem 1rem" }}>
        <img src={logo} alt="Logo" width="200" height="200" />
        <NavBar />
      </div>

      {/* Main content */}
      <Outlet />

      <footer style={{ textAlign: "center", marginTop: "2rem" }}>
        © 2026 Michaela Gyasi-Agyei
      </footer>
    </div>
  );
}

export default Layout;
