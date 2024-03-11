import Item from "../Item/Item";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";

export default function Popular() {
  const { Product } = useAuth();
  const [data, setData] = useState([]);
  const womenProducts = data.filter((item) => item.Category.name === "Women");
  const Popular = womenProducts.sort((a, b) => b.rating - a.rating).slice(0, 5)

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
    <>
      <div className="cloth-container">
        <h2>POPULAR IN WOMAN</h2>
        <div className="cloth-item">
          {Popular.map((item, index) => {
             return <Item key={index} id={item.id} name={item.name} image={item.ProductImage[0].image_url} rating={item.rating} new_price={item.price} description={item.description} />;
          })}
        </div>
      </div>
    </>
  );
}
