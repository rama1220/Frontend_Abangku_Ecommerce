import Item from "../Item/Item";
import { useAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function Relate({ value }) {
  const [data, setData] = useState([]);

  const { Product } = useAuth();
  const category = value;
  useEffect(() => {
  Product()
    .then((products) => {
      setData(products);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}, [Product]);

  return (
    <div className="cloth-container">
      <h2>PRODUCT RELATED</h2>
      <div className="cloth-item">
        {data.map((item, index) => {
          if (item.Category.name === category) {
             return <Item key={index} id={item.id} name={item.name} image={item.ProductImage[0].image_url} rating={item.rating} new_price={item.price} description={item.description}/>;
          }
        })}
      </div>
    </div>
  );
}
