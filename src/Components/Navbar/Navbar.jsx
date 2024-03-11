import logo from "../Assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import InputComponent from "../Input/InputComponent";
import { useAuth } from "../../Context/AuthContext";
import { Scrollbar } from "../../helper/Scrollbar";

export default function Navbar() {
  const { isAuthenticated, getCart } = useAuth();
  const [nameUser, setNameUser] = useState("");
  const [navActive, setNavactive] = useState(false);
  const [burger, setBurger] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [cartIcon, setCartIcon] = useState("");
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartData = await getCart();
        setData(cartData);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchData();
  }, [getCart, data]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");

    if (token && name === "Admin") {
      setNameUser(name);
      setUserRole("Admin");
      setCartIcon("cart");
    } else if (token && name !== "Admin") {
      setNameUser(name);
      setUserRole("user");
      setCartIcon("cart");
    } else {
      setNameUser("");
      setUserRole("login");
      setCartIcon("login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const total = Object.values(data).reduce((acc, curr) => acc + curr.quantity, 0);
    setTotalItems(total);
  }, [data]);

  const toggleNavActive = () => {
    setNavactive(!navActive);
    setBurger(!burger);
  };

  return (
    <>
      <nav>
        <div className="navbar">
          <Link to="/" className="logo-link" onClick={Scrollbar}>
            <div className="nav-logo">
              <img src={logo} alt="" />
              <p>Abangku.Co</p>
            </div>
          </Link>
          <div className={`nav-right ${navActive ? "nav-active" : ""}`}>
            <ul className="nav-menu">
              <li onClick={Scrollbar}>
                <NavLink to="/" className="nav-link">
                  <h5>Home</h5>
                </NavLink>
              </li>
              <li onClick={Scrollbar}>
                <NavLink to="/allproduct" className="nav-link">
                  <h5>All Product</h5>
                </NavLink>
              </li>
              <li onClick={Scrollbar}>
                <NavLink to="/about" className="nav-link">
                  <h5>About</h5>
                </NavLink>
              </li>
              <li>
                <InputComponent />
              </li>
            </ul>
          </div>
          <div className="nav-login-cart" onClick={Scrollbar}>
            <NavLink to={`/${userRole}`} className="nav-login">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
              </svg>
            </NavLink>

            <NavLink to={`${cartIcon}`} className="nav-login" onClick={Scrollbar}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
            </NavLink>
            <div className="nav-cart-count">{totalItems}</div>
          </div>
          <div className={`burger ${burger ? "toggle-burger" : ""}`} onClick={toggleNavActive}>
            <div className="line-1"></div>
            <div className="line-2"></div>
            <div className="line-3"></div>
          </div>
        </div>
        <div className="running-text">
          <h4>
            Hello <span>{nameUser ? nameUser.toUpperCase() : ""}</span> Welcome to Abangku.Co !!
          </h4>
        </div>
      </nav>
    </>
  );
}
