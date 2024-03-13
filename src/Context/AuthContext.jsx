/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [term, setTerms] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pageBanner, setBanner] = useState(null);
  const [filter, setCurrentFilter] = useState("");
  const [email, setEmail] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [order, setOrder] = useState("");
  const [or, setOr] = useState("");
  const [as, setAd] = useState("");
  const endpoint = "http://localhost:5000";

  useEffect(() => {
    if (localStorage.getItem("item", term) !== "null") {
      setTerms(localStorage.getItem("item"));
    }
  }, [term]);

  useEffect(() => {
    if (localStorage.getItem("email") !== "null") {
      setEmail(localStorage.getItem("email"));
    }
  }, [email]);

  const Login = async (email, password) => {
    try {
      const response = await axios.post(`${endpoint}/login`, {
        email: email,
        password: password,
      });
      setIsAuthenticated(true);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("name", user.fullname);
      localStorage.setItem("email", user.email);

      if (user.fullname === "Admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        setError(error.response.data.message);
      }
    }
  };
  const Register = async (fullname, username, password, email, phonenumber) => {
    try {
      await axios.post(`${endpoint}/register`, {
        fullname: fullname,
        username: username,
        password: password,
        email: email,
        phone: phonenumber,
      });
      window.location.href = "/login";
    } catch (error) {
      if (error.response) {
        setError(error.response.data.errors);
      }
    }
  };

  const Product = async () => {
    try {
      const response = await axios.get(`${endpoint}/product`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const GetProductbyId = async (id) => {
    try {
      const response = await axios.get(`${endpoint}/product/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const Search = async (searchTerm) => {
    try {
      const response = await axios.get(`${endpoint}/product?name=${searchTerm}`);
      console.log(response.data);
      setTerms(searchTerm);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const addToCart = async (product_id, quantity, size_id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${endpoint}/cart`,
        {
          product_id: product_id,
          quantity: quantity,
          size_id: size_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
      setAd(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  const getCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${endpoint}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const CheckOutItem = async (origin, destination, courier, discount, location) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${endpoint}/checkout`,
        {
          origin: origin,
          destination: destination,
          courier: courier,
          discount: discount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrder(response.data.order?.id);
      await Pay(response.data.order?.id);

      localStorage.setItem("address", location);
      localStorage.setItem("invoice", response.data.order?.invoice);
      localStorage.setItem("total", response.data.order?.total);
      localStorage.setItem("shipment", response.data.order?.shipment_fee);
      localStorage.setItem("orderID", response.data.order?.id);
      localStorage.setItem("payment", response.data.order?.status);

      setOr(response.data.order);
      console.log(response.data.order);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("roleID");
    localStorage.removeItem("isDarkMode");
    localStorage.removeItem("item");
  };
  const Banner = (Banner) => {
    setBanner(Banner);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("isDarkMode", !isDarkMode);
  };

  const PutProduct = async (quantity, size_id, product_id, id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${endpoint}/cart/${id}`,
        {
          quantity: quantity,
          size_id: size_id,
          product_id: product_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      console.error(error.response.data.message);
      throw error;
    }
  };

  const DeleteItemCart = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${endpoint}/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Cart deleted:", response.data.message);
      return response.data;
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  };

  const GetProvinces = async () => {
    try {
      const response = await axios.get(`${endpoint}/provinces`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching provinces:", error);
      throw error;
    }
  };

  const GetOrigin = async (id) => {
    try {
      const response = await axios.get(`${endpoint}/cities/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const GetDestination = async (id) => {
    try {
      const response = await axios.get(`${endpoint}/cities/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const Pay = async (orderID) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${endpoint}/pay`,
        {
          order_id: orderID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const redirectUrl = response.data.data.redirect_url;
      console.log("Redirect URL:", redirectUrl);

      localStorage.setItem("paymentUrl", redirectUrl);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const setFilter = (filter) => setCurrentFilter(filter);

  const values = {
    Login,
    Register,
    Product,
    isAuthenticated,
    error,
    GetProductbyId,
    Search,
    term,
    Banner,
    pageBanner,
    setFilter,
    filter,
    Logout,
    addToCart,
    getCart,
    toggleDarkMode,
    isDarkMode,
    setIsDarkMode,
    PutProduct,
    DeleteItemCart,
    GetProvinces,
    GetOrigin,
    GetDestination,
    CheckOutItem,
    order,
    or,
    Pay,
    as,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, useAuth };
