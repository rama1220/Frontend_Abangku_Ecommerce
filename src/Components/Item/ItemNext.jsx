import PropTypes from "prop-types";

const ItemNext = (props) => {
  const {  image} = props;

  return (
    <div className="item-next">
      <img src={image} alt="" />
      <p>New Item Next month</p>
    </div>
  );
};

ItemNext.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,

};

export default ItemNext;
