import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CreateStars } from "../../helper/Rating";
import { Scrollbar } from "../../helper/Scrollbar";
import formatRupiah from "../../helper/Rupiah";

const Item = (props) => {
  const { id, image, name, new_price, rating, description } = props;
  const desc = description.substring(0, 20);
  return (
    <div className="item " onClick={Scrollbar}>
      <Link to={`detail/${id}`} className="link-item">
        <img src={image} alt={name} />
        <p className="item-name">{name}</p>
        <p className="desc">{desc}...</p>
        <div className="rating">{rating && CreateStars(rating)}</div>
        <div className="item-prices">
          <div className="item-price-new">IDR {formatRupiah(new_price)}</div>
        </div>
      </Link>
    </div>
  );
};

Item.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number,
  new_price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default Item;
