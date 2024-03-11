import { Link } from "react-router-dom";
import PictLogin from "../Components/Assets/pictLogin.jpg";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

export default function LoginSingUp() {
  const { Login, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState("password");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await Login(email, password);
    } catch (error) {
      console.error("Failed to log in:", error.message);
    }
  };

  const handleEye = () => {
    setShowPassword(!showPassword);
    if (!showPassword) {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <>
      <div className="containe-form">
        <div className="image-container">
          <img src={PictLogin} alt="" />
        </div>
        <div className="login-container">
          <h3>Log in</h3>

          <form id="form-login" onSubmit={handleLogin} className="form">
            <h5>{error === "Email not found" || error === "Invalid email" || error === "All fields are required" ? error : ""}</h5>
            <input type="email" placeholder="Email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <h5>{error === "Invalid password" ? error : ""}</h5>
            <div className="visible-box">
              <input type={type} placeholder="Password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="password" />
              <Icon icon={icon} size={12} className="eye" onClick={handleEye} />
            </div>
            <button type="submit">LOG IN</button>
            <p>
              Dont have an account?
              <Link to="/register" className="nav-link">
                <span> Sign Up</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
