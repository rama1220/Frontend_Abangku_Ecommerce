/* eslint-disable no-unused-vars */
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import AdminNavbar from "../Components/admin/components/AdminNav";
import Sidebar from "../Components/admin/components/Sidebar";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "../Components/Assets/profile.png";

const ProfileUser = () => {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const endPoint = "http://localhost:5000/user";

  useEffect(() => {
    axios.get(endPoint, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
      setUser(response.data);
    });
  }, [token, endPoint]);
  console.log(user);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AdminNavbar />
        {/* <Sidebar /> */}
        <Box
          component="main"
          sx={{
            left: 300,
            width: "calc(100% - 340px)",
            bgcolor: "white",
            p: 3,
            height: "auto",
          }}
        >
          <Toolbar />
          <div className="profile-box">
            <h2>
              My Profile
              <br />
            </h2>
            <br />
            <div className="container-profile">
              <img src={Profile} alt="" className="profile" />
              <table className="table-profile">
                <tbody>
                  <tr>
                    <td>Username</td>
                    <td>:</td>
                    <td style={{ textAlign: "left" }}>{user.username}</td>
                  </tr>
                  <tr>
                    <td>Fullname</td>
                    <td>:</td>
                    <td style={{ textAlign: "left" }}>{user.fullname}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>:</td>
                    <td style={{ textAlign: "left" }}>{user.phone}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>:</td>
                    <td style={{ textAlign: "left" }}>{user.address}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>:</td>
                    <td style={{ textAlign: "left" }}>{user.gender}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Link to={"/edit_user"} className="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
              </svg>
            </Link>
            <Link to="/virtualAccount">
              <button className="btn-action-order">My Order</button>
            </Link>
          </div>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
export default ProfileUser;
