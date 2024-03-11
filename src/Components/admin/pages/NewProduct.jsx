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
  Checkbox,
  Button,
  Box,
} from "@mui/material";
import { ModalProduct } from "../components/ModalProduct";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rating, setRating] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedSize, setSelectedSize] = useState({});
  const [images, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const sizes = ["S", "M", "L", "XL", "XXL"];

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("rating", rating);
    formData.append("category_id", category_id);
    formData.append("weight", weight);

    // Append selected sizes indices
    const selectedIndices = Object.keys(selectedSize)
      .filter((size) => selectedSize[size])
      .map((size) => sizes.indexOf(size) + 1);

    formData.append("size", JSON.stringify(selectedIndices));
    formData.append("images", images);
    axios
      .post("http://localhost:5000/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setShowModal(true);
        }
      })
      .catch((err) => {
        if (err.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          console.log("Response data:", err.response.data);
          console.log("Response status:", err.response.status);
          console.log("Response headers:", err.response.headers);
        } else if (err.request) {
          console.log("Request:", err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error:", err.message);
        }
        console.log("Error config:", err.config);
      });
  }
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

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageUrl(null);
  };

  const handleCheckboxChange = (size) => {
    setSelectedSize((prev) => ({
      ...prev,
      [size]: !prev[size],
    }));
  };

  return (
    <React.Fragment>
      <Typography variant="h5">Create A New Product</Typography>
      <form
        className="form"
        onSubmit={handleSubmit}
        action={<Link to="/login" />}
      >
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
            <Typography variant="h6">Product Information</Typography>
            <Divider sx={{ mb: 2 }} />

            <Typography paragraph sx={{ mb: 1, padding: 0 }}>
              Product Name
            </Typography>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Name"
              sx={{ mb: 1 }}
              onChange={(e) => setName(e.target.value)}
              value={name}
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
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
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
                  defaultValue={"0"}
                  onChange={(e) => setCategory_id(e.target.value)}
                >
                  <MenuItem value="0" disabled>
                    Select Category
                  </MenuItem>
                  <MenuItem value="1">Men</MenuItem>
                  <MenuItem value="2">Women</MenuItem>
                  <MenuItem value="3">Kid</MenuItem>
                  <MenuItem value="4">Family</MenuItem>
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
              label="desc"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
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
                  required
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
                      <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 100 }} />
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
              label="Quantity"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              required
              fullWidth
              sx={{ mb: 4 }}
            />
            <TextField
              type="number"
              variant="outlined"
              color="secondary"
              label="Rating"
              onChange={(e) => setRating(e.target.value)}
              value={rating}
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
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
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
            <ModalProduct
              onClose={() => {
                setShowModal(false);
                window.location.href = "/admin/products";
              }}
            />
          )}
        </div>
      </form>
    </React.Fragment>
  );
};

export default NewProduct;
