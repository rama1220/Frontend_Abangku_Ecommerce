import Sidebar from "../Components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";

import Navbar from "../Components/Navbar/Navbar";
import SelectOption from "../Components/SelectOption/SelectOption";
import Arrowup from "../Components/ArrowUp/ArrowUp";
import Banner from "../Components/Banner/Banner";

export default function ProductMenu() {
  return (
    <>
      <Navbar />
      <div className="banner">
        <Banner />
      </div>
      <div className="main-container">
        <Sidebar />
        <SelectOption />
        <Outlet />
      </div>
      <Arrowup />
      <Footer />
    </>
  );
}
