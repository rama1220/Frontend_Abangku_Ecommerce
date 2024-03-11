import { Link } from "react-router-dom";
import { Scrollbar } from "../../helper/Scrollbar";

export default function InformationSect() {
  return (
    <>
      <div className="info-sec2">
        <h4 className="info-title">Shop for Fashion at the Abangku.Co Indonesia Online Store</h4>

        <p className="information-section">
          Abangku.Co Indonesia is an online shop where your favorite fashion brands are located. By shopping for fashion at the Abangku.Co Indonesia online shop you can find the best exclusive fashion products from thousands of well-known
          fashion brands, as well as products that are guaranteed to be original. We, as the largest online fashion shopping center in Indonesia, can answer the needs of mens fashion and womens fashion by offering the latest and leading
          brands, both local and international.
        </p>
      </div>
      <div className="info-sec1">
        <div className="information-discount">
          <h2>Order now and get 10% off!</h2>
          <Link to="/allproduct" className="nav-link-btn" onClick={Scrollbar}>
            <button>See Product</button>
          </Link>
        </div>
      </div>
    </>
  );
}
