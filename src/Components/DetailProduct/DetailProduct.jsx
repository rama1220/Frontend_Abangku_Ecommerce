import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Relate from "../Relate/Relate";
import { CreateStars } from "../../helper/Rating";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Scrollbar } from "../../helper/Scrollbar";
import ModalSucces from "../ModalBox/ModalSucces";
import formatRupiah from "../../helper/Rupiah";

export default function DetailProduct() {
  const { GetProductbyId, isAuthenticated, addToCart } = useAuth();
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const productId = parseInt(id);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(false);
  const [auth, setIsAuthenticated] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== "null") {
      setIsAuthenticated(token);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    GetProductbyId(productId)
      .then((product) => {
        setProduct(product);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [GetProductbyId, productId]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(false);
        setSelectedSize(null);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [message]);
  const handleAddToCart = () => {
    if (auth === null) {
      navigate("/login");
      Scrollbar();
    } else {
      if (selectedSize) {
        addToCart(product?.id, quantity, selectedSize);
        setMessage(true);
      } else {
        setShowModal(true);
      }
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };
  return (
    <>
      {product && (
        <>
          <div className="path-product">
            <h5>
              <Link to="/" className="nav-link-path ">
                Shop
              </Link>
              {" > "}
              <Link to={`/${product.Category.name}`} className="nav-link-path">
                {product.Category.name}
              </Link>
              {" > "}
              {product.name}
            </h5>
          </div>
          <div className={`detail-container ${isZoomed ? "zoomed" : ""}`}>
            <div className={`detail-left ${isZoomed ? "zoomed" : ""}`}>
              <div className="detail-image" onClick={() => setIsZoomed(!isZoomed)}>
                <img src={product.ProductImage[0].image_url} alt={product.name} />
              </div>
            </div>
            <div className="detail-right">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="rating">
                {product.rating} {CreateStars(product.rating)}
              </div>
              <div className="item-prices">
                <div className="item-price-new">IDR {formatRupiah(product.price)}</div>
              </div>
              <h4>Select Size</h4>
              <div className="btn-size">
                {product.ProductSize.map((size, index) => (
                  <button key={index} onClick={() => setSelectedSize(size.Size.id)}>
                    {size.Size.name}
                  </button>
                ))}
              </div>

              <div>
                <h4>Quantity</h4>
                <div className="quantity-container">
                  <button className="btn-action-cart" onClick={handleDecrease}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                    </svg>
                  </button>
                  <div className="quantity">{quantity}</div>

                  <button className="btn-action-cart" onClick={handleIncrease}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="btn-addCart">
                <button onClick={handleAddToCart}>ADD TO CART</button>
              </div>
            </div>
          </div>
          {showModal && (
            <div className="modal-box">
              <div className="boxContainer">
                <h2>Choose your size!</h2>
                <button onClick={() => setShowModal(false)}>OK</button>
              </div>
            </div>
          )}
          {message && (
            <div className="success-box">
              <ModalSucces />
            </div>
          )}
          <Relate value={product.Category.name} />
        </>
      )}
    </>
  );
}
