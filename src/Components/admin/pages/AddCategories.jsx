import {
  Container,
  Typography,
  Input,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddCategories = () => {
  const [category, setCategory] = useState({});
  const navigate = useNavigate();

  const addCategory = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/category`, {
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
      <Container sx={{ padding: "32px", width: "100%", height: "100%" }}>
        <CardContent>
          <Card sx={{ padding: "32px" }}>
            <h2>Add Category</h2>
            <Container sx={{ display: "flex", flexDirection: "column" }}>
              <Typography paragraph sx={{ mb: 1, padding: 0 }}>
                Category Name
              </Typography>
              <Input
                value={category.name}
                sx={{ width: "100%", mb: 1 }}
                id="outlined-basic"
                placeholder="Name"
                variant="outlined"
                onChange={(e) =>
                  setCategory({ ...category, name: e.target.value })
                }
              ></Input>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "40px",
                }}
              >
                <Link to={"/admin/Categories"}>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "red", width: "40%" }}
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  onClick={addCategory}
                  variant="contained"
                  sx={{ backgroundColor: "green", width: "40%" }}
                >
                  Save
                </Button>
              </div>
            </Container>
          </Card>
        </CardContent>
      </Container>
    </>
  );
};
export default AddCategories;
