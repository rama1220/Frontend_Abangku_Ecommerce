import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Scrollbar } from "../../helper/Scrollbar";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import formatRupiah from "../../helper/Rupiah";

export default function CartItems() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [data, setData] = useState([]);
  const [sizes, setSizes] = useState([]);
  const { getCart, GetProductbyId, PutProduct, DeleteItemCart } = useAuth();
  const [quantity, setQuantity] = useState(0);
  const [sizesEvent, setSizesEvent] = useState("");
  const [productId, setProductId] = useState(0);
  const navigate = useNavigate();

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

  const handleIdSize = (sizeId) => {
    setSizesEvent(sizeId);
  };

  const handleDelete = async (id) => {
    try {
      await DeleteItemCart(id);
      const updatedCart = await getCart();
      setData(updatedCart);

      if (updatedCart.length === 0) {
        navigate("/allproduct");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleSave = () => {
    if (data.length > 0 && quantity !== "" && sizesEvent && productId !== 0 && modalProduct.id !== null) {
      const fetchData = async () => {
        try {
          await PutProduct(quantity, sizesEvent, productId, modalProduct.id);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchData();
      setIsModalOpen(false);
    } else {
      console.error("Error: Incomplete data");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartData = await getCart();
        setData(cartData);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchData();
  }, [getCart, data]);

  useEffect(() => {
    const fetchProductById = async () => {
      if (modalProduct) {
        try {
          const product = await GetProductbyId(modalProduct.product_id);
          setProductId(product.id);
          setSizes(product.ProductSize);
        } catch (error) {
          console.error("Error fetching product by ID:", error);
        }
      }
    };

    fetchProductById();
  }, [modalProduct, GetProductbyId]);

  const openModal = (product) => {
    setModalProduct(product);
    setIsModalOpen(true);
    setQuantity(product.quantity);
    setProductId(product.id);
    if (product && product.Size && product.Size.id) {
      setSizesEvent(product.Size.id);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (modalProduct && modalProduct.quantity) {
      setQuantity(modalProduct.quantity);
    }
  }, [modalProduct]);

  return (
    <div className="cartItems">
      <div className="cartItems-format-main">
        <h3 className="cartItems-title">Shopping Cart</h3>
        <table>
          <thead>
            <tr>
              <th className="th-product">Product</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <img src={item.Product.ProductImage[0].image_url} alt={item.name} className="carticon-product-icon" />
                </td>
                <td className="product-name">
                  {item.Product.name} <p>IDR {formatRupiah(item.Product.price)}</p>
                  <p>Size: {item.Size.name} </p>
                </td>
                <td>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="edit-modal"
                    viewBox="0 0 16 16"
                    onClick={() => {
                      openModal(item);
                      handleIdSize(item.size_id);
                    }}
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                  </svg>
                </td>
                <td>{item.quantity}</td>
                <td>
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 16 16" className="edit-modal" onClick={() => handleDelete(item.id)}>
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && modalProduct && (
        <div className="modal-edit-item">
          <div className="modal-content">
            <img src={modalProduct.Product.ProductImage[0].image_url} alt={modalProduct.Product.name} className="modal-product-image" />
            <p>{modalProduct.Product.name}</p>
            <div className="btn-size">
              {sizes &&
                sizes.map((size, index) => (
                  <button key={index} onClick={() => handleIdSize(size.Size.id)}>
                    {size.Size.name}
                  </button>
                ))}
            </div>
            <div className="modal-button-container">
              <button
                onClick={() => {
                  handleDecrease();
                }}
                className="btn-action-cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
                </svg>
              </button>
              <p className="p-quantity">Quantity:</p>
              <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} className="input-action" />
              <button
                onClick={() => {
                  handleIncrease();
                }}
                className="btn-action-cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-.5 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                </svg>
              </button>
            </div>
            <div className="btn-group-modal">
              <button onClick={closeModal} className="btn-action">
                Close
              </button>
              <button onClick={() => handleSave(quantity, sizesEvent, productId, modalProduct.id)} className="btn-action">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="cartItems-down">
        <div className="cartItems-total">
          {data.length > 0 ? (
            <button onClick={Scrollbar}>
              <Link to="/checkout" className="nav-link-checkout">
                PROCESS FOR DELIVERY
              </Link>
            </button>
          ) : (
            <button disabled className="btn-disabled">
              <span>PROCESS FOR DELIVERY</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
