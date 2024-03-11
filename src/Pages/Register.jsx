import PictLogin from "../Components/Assets/pictLogin.jpg";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

export default function Register() {
  const { Register, error } = useAuth();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState("password");

  useEffect(() => {
    if (error && error.allFields && error.allFields.message) {
      setErrorMessage(error.allFields);
    } else {
      setErrorMessage(error);
    }
  }, [error]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await Register(fullname, username, password, email, phonenumber);
    } catch (error) {
      console.error("Failed to Register:", error.message);
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
          <h3>Register</h3>

          <form id="register" onSubmit={handleRegister} className="form">
            <h5>
              {errorMessage?.message} {fullname.length < 3 && fullname.length > 0 && "Fullname must be at least 3 characters"}
            </h5>
            <input type="text" placeholder="Fullname" id="fullname" name="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} />
            <h5>{username.length < 3 && username.length > 0 && "Username must be at least 3 characters"}</h5>
            <input type="text" placeholder="Username" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <h5>{errorMessage?.password?.message}</h5>
            <div className="visible-box">
              <input type={type} placeholder="Password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="password" />
              <Icon icon={icon} size={12} className="eye" onClick={handleEye} />
            </div>
            <h5>{errorMessage?.email?.message}</h5>
            <input type="email" placeholder="Email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <h5>{errorMessage?.phone?.message}</h5>
            <input type="text" placeholder="Phone Number" id="phonenumber" name="phonenumber" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
