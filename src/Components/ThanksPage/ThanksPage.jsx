import { Link } from "react-router-dom";
import PageNot404 from "../Assets/fashion.jpg";

export default function ThanksPage() {
  return (
    <>
      <div className="notFound-page">
        <img src={PageNot404} alt="" />

        <div className="side-right-page">
          <h1>404</h1>
          <p>The page you were browsing could not be found. You can find the fashion model you like again at Shoppingkuy!</p>
          <Link to="/" className="nav-link">
            <button>Back to Home</button>
          </Link>
        </div>
      </div>
    </>
  );
}
