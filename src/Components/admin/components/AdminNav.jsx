import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import logo from "../../Assets/logo.png";
import { Scrollbar } from "../../../helper/Scrollbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";

export default function AdminNavbar() {
const navigate = useNavigate();
  const {Logout } = useAuth();

const handleLogout =() =>{
  Logout()
  navigate('/login')
}

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <nav>
          <div className="admin-navbar">
            <Link to="/" className="logo-link">
              <div className="nav-logo">
                <img src={logo} alt="" />
                <p>Abangku.Co</p>
              </div>
            </Link>
            <ul className="admin-nav-menu">
              <li onClick={Scrollbar}>
                <NavLink to="/" className="admin-nav-link" style={{ display: "none" }}>
                  <h5>Profile Page</h5>
                </NavLink>
              </li>
              <li onClick={Scrollbar}>
                <NavLink to="/about" className="admin-nav-link" style={{ display: "none" }}>
                  <h5>About</h5>
                </NavLink>
              </li>
            </ul>
            <div className="nav-login-cart" onClick={Scrollbar}>
                <li onClick={() => handleLogout()}>Log Out</li> |
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
              </svg>
            </div>
          </div>
        </nav>
      </AppBar>
    </Box>
  );
}
