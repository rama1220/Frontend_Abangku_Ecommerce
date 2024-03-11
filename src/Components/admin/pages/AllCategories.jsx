/* eslint-disable no-unused-vars */
import {
  TableHead,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Container,
  Skeleton,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const AllCategories = () => {
  const [useCategory, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 3 seconds
    }, 2000);

    axios.get("http://localhost:5000/category").then((response) => {
      setCategory(response.data);
    });
    return () => clearTimeout(timer);
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    // Konfirmasi sebelum menghapus
    const confirmDelete = window.confirm(
      `Apakah Anda yakin ingin menghapus kategori ini ?`
    );

    if (!confirmDelete) {
      return; // Batal menghapus jika pengguna membatalkan konfirmasi
    }
    try {
      await axios.delete(`http://localhost:5000/category/${categoryId}`);

      window.location.reload();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };
  return (
    <>
      <div
        className="header-product"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <h3>All Categories</h3>
        <Button variant="contained">
          <Link to="/admin/addCategories" className="nav-link" style={{ color: "white" }}>
            Add Categories
          </Link>
        </Button>
      </div>

      <Container
        className="category-container"
        sx={{
          minWidth: 450,
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          paddingLeft: "10px",
          paddingRight: "10px",
          justifyContent: "center",
        }}
      >
        <TableContainer sx={{ alignItems: "center", padding: "24px" }}>
          {loading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "24px",
                justifyContent: "center",
              }}
            >
              <Skeleton animation="wave" variant="rectangular" height={64} sx={{ width: "80%", marginBottom: "10px" }} />

              <Skeleton animation="wave" variant="rounded" height={350} sx={{ width: "80%" }} />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "24px",
                justifyContent: "center",
              }}
            >
              <Table sx={{ width: "80%" }}>
                <TableHead
                  sx={{
                    width: "100%",
                    padding: "10px",
                    alignContent: "center",
                  }}
                >
                  <TableRow>
                    <TableCell style={{ width: "10%" }}>ID</TableCell>
                    <TableCell style={{ width: "80%", textAlign: "center" }}>Name</TableCell>
                    <TableCell style={{ width: "10%" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ width: "100%" }}>
                  {useCategory.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <button style={{ width: "100px", backgroundColor: "grey", border: "none", padding: "5px", radius: "5px", borderRadius: "5px", marginBottom: "10px", cursor: "pointer" }}>
                          <Link to={`edit/${item.id}`} style={{ color: "white", textDecoration: "none" }}>
                            Edit
                          </Link>
                        </button>
                        <button onClick={() => handleDeleteCategory(item.id)} style={{ width: "100px", color: "white", backgroundColor: "red", border: "none", padding: "5px", radius: "5px", borderRadius: "5px", cursor: "pointer" }}>
                          Hapus
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TableContainer>
      </Container>
    </>
  );
};

export default AllCategories;
