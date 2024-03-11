import {
  Card,
  Container,
  Typography,
  TextField,
  Divider,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  Box,
  Button,
  Checkbox,
  Stack,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useParams, Link } from "react-router-dom";
import {
  ModalConfirmDelete,
  ModalEditProduct,
  ModalDeleteProduct,
} from "../components/ModalProduct";

function EditProduct() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImage] = useState(null);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [category, setCategory] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const { id } = useParams();
  const end_point = "http://localhost:5000/product";
  const url = `${end_point}/${id}`;
  const [product, setProduct] = useState(null);

  function handleImageChange(e) {
    setImage(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  }

  const handleDeleteClick = (productId) => {
    setProductIdToDelete(productId);
    setShowDeleteModal(true);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageUrl(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setProduct(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]); // Include url in the dependency array to re-run effect when it changes

  useEffect(() => {
    axios.get("http://localhost:5000/category").then((response) => {
      setCategory(response.data);
    });
  }, []);

  const selectedIndices = Object.keys(selectedSize)
    .filter((size) => selectedSize[size])
    .map((size) => sizes.indexOf(size) + 1);

  const sizeJSONString = JSON.stringify(selectedIndices);

  const handleYesClick = async () => {
    try {
      await axios
        .delete(`http://localhost:5000/product/${productIdToDelete}`)
        .then((res) => {
          console.log(productIdToDelete);
          console.log(res);
          if (res.status === 200) {
            setShowDeleteModal(false);
            setShowSuccessModal(true);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxChange = (size) => {
    setSelectedSize((prev) => ({
      ...prev,
      [size]: !prev[size],
    }));
  };

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", product?.name);
    formData.append("description", product?.description);
    formData.append("price", product?.price);
    formData.append("quantity", product?.quantity);
    formData.append("rating", product?.rating);
    formData.append("category_id", product?.category_id);
    formData.append("weight", product?.weight);
    formData.append("size", sizeJSONString);
    formData.append("images", images);

    axios
      .put(`http://localhost:5000/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setShowModal(true);
        }
      })
      .catch((err) => {
        console.log(err);
      }, []);
  }

  return (
    <div>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h5">Edit Product</Typography>
        <Button onClick={() => handleDeleteClick(product?.id)}>
          <DeleteForeverIcon sx={{ fontSize: 36, color: "red" }} />
        </Button>
      </Stack>
      <form onSubmit={handleSubmit}>
        <Container
          sx={{
            display: "flex",
            mt: 2,
            justifyContent: "left",
            gap: 2,
            width: "100%",
            overflow: "auto",
          }}
        >
          <Card variant="outlined" sx={{ flexGrow: 1, width: 620, padding: 4 }}>
            <Typography paragraph sx={{ mb: 1, padding: 0 }}>
              Product Name
            </Typography>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              sx={{ mb: 1 }}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              value={product?.name}
              fullWidth
              required
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography paragraph sx={{ mb: 1, padding: 0 }}>
                  Price
                </Typography>
                <OutlinedInput
                  type="number"
                  variant="outlined"
                  color="secondary"
                  startAdornment={
                    <InputAdornment position="start">Rp.</InputAdornment>
                  }
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                  value={product?.price}
                  fullWidth
                  required
                  sx={{ width: "32ch", mb: 1 }}
                />
              </div>
              <div>
                <Typography paragraph sx={{ mb: 1, padding: 0 }}>
                  Category
                </Typography>
                <Select
                  sx={{ width: "32ch", mb: 1 }}
                  placeholder="Select Category"
                  onChange={(e) =>
                    setProduct({ ...product, category_id: e.target.value })
                  }
                >
                  {category.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <Typography paragraph sx={{ mb: 1, padding: 0 }}>
              Product Description
            </Typography>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              value={product?.description}
              fullWidth
              multiline
              rows={4}
              required
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Media
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography paragraph sx={{ mb: 1, padding: 0 }}>
              Product Image
            </Typography>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Container
                component="section"
                sx={{
                  width: "400px",
                  height: "400px",
                  border: "1px dashed grey",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                  name="images"
                  id="select-image"
                />
                <label htmlFor="select-image">
                  <Button component="span">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <img src={product?.ProductImage[0].image_url} />
                    )}
                  </Button>
                </label>
              </Container>
              {imageUrl && selectedImage && (
                <Box mt={2} textAlign="center">
                  <Button onClick={handleRemoveImage}>Remove Image</Button>
                </Box>
              )}
            </Container>
          </Card>
          <Card
            variant="outlined"
            sx={{ flex: 2, width: 620, height: "fit-content", padding: 4 }}
          >
            <Typography variant="h6"> Product Status</Typography>
            <Divider sx={{ mb: 2 }} />
            <TextField
              type="number"
              variant="outlined"
              color="secondary"
              onChange={(e) =>
                setProduct({ ...product, quantity: e.target.value })
              }
              value={product?.quantity}
              required
              fullWidth
              sx={{ mb: 4 }}
            />
            <TextField
              type="number"
              variant="outlined"
              color="secondary"
              onChange={(e) =>
                setProduct({ ...product, rating: e.target.value })
              }
              value={product?.rating}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            <div>
              <Typography variant="h6">Product Weight</Typography>
              <Divider sx={{ mb: 2 }} />
              <OutlinedInput
                type="number"
                variant="outlined"
                color="secondary"
                endAdornment={
                  <InputAdornment position="start">gr</InputAdornment>
                }
                onChange={(e) =>
                  setProduct({ ...product, weight: e.target.value })
                }
                value={product?.weight}
                fullWidth
                required
                sx={{ mb: 1 }}
              />
            </div>
            <Typography variant="h6">Available Product Size</Typography>
            <Divider sx={{ mb: 2 }} />
            <div style={{ display: "flex", flexDirection: "row" }}>
              {sizes.map((size) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  key={size}
                >
                  <Typography>{size}</Typography>
                  <Checkbox
                    checked={selectedSize[size]}
                    defaultChecked={
                      product?.ProductSize &&
                      product.ProductSize.some(
                        (productSize) => productSize.Size.name === size
                      )
                    }
                    onChange={() => handleCheckboxChange(size)}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Container>
        <Divider sx={{ mt: 2 }} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Link to="/admin/products" sx={{ width: "40%" }}>
            <Button variant="contained" sx={{ backgroundColor: "red", mt: 2 }}>
              Cancel
            </Button>
          </Link>
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 2, backgroundColor: "green", width: "10%" }}
          >
            Save
          </Button>
          {showModal && (
            <ModalEditProduct
              onClose={() => {
                setShowModal(false);
                window.location.href = "/admin/products";
              }}
            />
          )}
        </div>
      </form>
      {showDeleteModal && (
        <ModalConfirmDelete
          onClose={() => setShowDeleteModal(false)}
          onYesClick={handleYesClick}
        />
      )}
      {showSuccessModal && (
        <ModalDeleteProduct
          onClose={() => {
            setShowSuccessModal(false);
            window.location.href = "/admin/products";
          }}
        />
      )}
    </div>
  );
}

export default EditProduct;
