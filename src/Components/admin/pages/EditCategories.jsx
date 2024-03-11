/* eslint-disable no-unused-vars */
import { Typography, TextField, Container, Button, Input } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditCategories = () => {
  const [category, setCategory] = useState({});
  const navigate = useNavigate();

  const { id } = useParams();
  const end_point = "http://localhost:5000/category";
  const url = `${end_point}/${id}`;

  useEffect(() => {
    axios.get(url).then((response) => {
      setCategory(response.data);
    });
  }, {});
  console.log(category);

  const sendDataToBackend = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/category/${id}`, {
        name: category.name,
      });
      console.log("Respon dari server:", response.data);
      navigate("/admin/Categories");
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <>
      <h3>Edit Category</h3>
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Typography paragraph sx={{ mb: 1, padding: 0 }}>
          Category Name
        </Typography>
        <Input value={category.name} sx={{ width: "100%", mb: 1 }} id="outlined-basic" placeholder="Name" variant="outlined" onChange={(e) => setCategory({ ...category, name: e.target.value })}></Input>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
          <Link to={"/admin/Categories"}>
            <Button variant="contained" sx={{ backgroundColor: "red", width: "40%" }}>
              Cancel
            </Button>
          </Link>
          <Button onClick={sendDataToBackend} variant="contained" sx={{ backgroundColor: "green", width: "40%" }}>
            Save
          </Button>
        </div>
      </Container>
    </>
  );
};
export default EditCategories;
