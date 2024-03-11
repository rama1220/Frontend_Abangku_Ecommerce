import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { Outlet } from "react-router-dom";
import ArrowUp from "./Components/ArrowUp/ArrowUp";
function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <ArrowUp />
      <Footer />
    </>
  );
}

export default App;
