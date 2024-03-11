import { Typography, Input, Button } from "@mui/material";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import AdminNavbar from "../Components/admin/components/AdminNav";

const EditUser = () => {
  const [user, setUser] = useState({});

  const endPoint = "http://localhost:5000/user";
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(endPoint, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then((response) => {
      setUser(response.data);
    });
  }, {});
  console.log(user);

  const sendDataToBackend = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/edit_user`,
        {
          username: user.username,
          fullname: user.fullname,
          phone: user.phone,
          address: user.address,
          gender: user.gender,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      console.log("Respon dari server:", response.data);
      navigate("/user");
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

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
            width: "calc(100% - 240px)",
            bgcolor: "#F6F6F7",
            p: 3,
            height: "auto",
          }}
        >
          <Toolbar />
          <h2>
            Edit User
            <br />
          </h2>
          <br />
          <Typography paragraph sx={{ mb: 1, padding: 0 }}>
            Username
          </Typography>
          <Input value={user.username} sx={{ width: "100%", mb: 1 }} id="outlined-basic" placeholder="username" variant="outlined" onChange={(e) => setUser({ ...user, username: e.target.value })}></Input>
          <Typography paragraph sx={{ mb: 1, padding: 0 }}>
            Fullname
          </Typography>
          <Input value={user.fullname} sx={{ width: "100%", mb: 1 }} id="outlined-basic" placeholder="fullname" variant="outlined" onChange={(e) => setUser({ ...user, fullname: e.target.value })}></Input>
          <Typography paragraph sx={{ mb: 1, padding: 0 }}>
            Phone
          </Typography>
          <Input value={user.phone} sx={{ width: "100%", mb: 1 }} id="outlined-basic" placeholder="phone" variant="outlined" onChange={(e) => setUser({ ...user, phone: e.target.value })}></Input>
          <Typography paragraph sx={{ mb: 1, padding: 0 }}>
            Address
          </Typography>
          <Input value={user.address} sx={{ width: "100%", mb: 1 }} id="outlined-basic" placeholder="address" variant="outlined" onChange={(e) => setUser({ ...user, address: e.target.value })}></Input>
          <Typography paragraph sx={{ mb: 1, padding: 0 }}>
            Gender
          </Typography>
          <Input value={user.gender} sx={{ width: "100%", mb: 1 }} id="outlined-basic" placeholder="gender" variant="outlined" onChange={(e) => setUser({ ...user, gender: e.target.value })}></Input>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
            <Link to={"/user"}>
              <Button variant="contained" sx={{ backgroundColor: "red", width: "40%" }}>
                Cancel
              </Button>
            </Link>
            <Button onClick={sendDataToBackend} variant="contained" sx={{ backgroundColor: "green", width: "40%" }}>
              Save
            </Button>
          </div>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
export default EditUser;
