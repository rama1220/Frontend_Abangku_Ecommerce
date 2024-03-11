import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./Main.css";
import "./Responsive.css";
import { RouterProvider } from "react-router-dom";
import Router from "./Router.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import axios from "axios";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <AuthProvider>
          <RouterProvider router={Router}>
            <App />
          </RouterProvider>
      </AuthProvider>
  </React.StrictMode>
);
