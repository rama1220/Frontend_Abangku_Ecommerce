import { Link } from "react-router-dom";
import { Scrollbar } from "../../helper/Scrollbar";
import { useAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [pageBanner, setPageBanner] = useState(4);
  const { Banner } = useAuth();

  useEffect(() => {
    Banner(pageBanner);
  }, [Banner, pageBanner]);

  return (
    <>
      <div className="category">
        <div className="box-category">
          <h3>Category</h3>
          <div className="cate-menu">
            <ul>
              <li
                onClick={() => {
                  Scrollbar();
                  setPageBanner(1);
                }}
              >
                <Link to="bestseller" className="nav-link">
                  <button>Best Seller</button>
                </Link>
              </li>
              <li
                onClick={() => {
                  Scrollbar();
                  setPageBanner(2);
                }}
              >
                <Link to="newcollection" className="nav-link">
                  <button>New Collections</button>
                </Link>
              </li>
            </ul>
            <ul>
              <li
                onClick={() => {
                  Scrollbar();
                  setPageBanner(4);
                }}
              >
                <Link to="allproduct" className="nav-link">
                  <button>All Product</button>
                </Link>
              </li>
              <li
                onClick={() => {
                  Scrollbar();
                  setPageBanner(7);
                }}
              >
                <Link to="men" className="nav-link">
                  <button>Men</button>
                </Link>
              </li>
              <li
                onClick={() => {
                  Scrollbar();
                  setPageBanner(8);
                }}
              >
                <Link to="women" className="nav-link">
                  <button>Women</button>
                </Link>
              </li>
              <li
                onClick={() => {
                  Scrollbar();
                  setPageBanner(6);
                }}
              >
                <Link to="kid" className="nav-link">
                  <button>Kid</button>
                </Link>
              </li>
              <li
                onClick={() => {
                  Scrollbar();
                  setPageBanner(5);
                }}
              >
                <Link to="family" className="nav-link">
                  <button>Family</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
