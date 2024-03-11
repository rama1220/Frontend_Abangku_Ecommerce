import Item from "../Components/Item/Item";
import { useAuth } from "../Context/AuthContext";
import { useEffect, useState } from "react";
export default function NewCollection() {
  const { Product } = useAuth();
  const [data, setData] = useState([]);


const newCollect = data.sort((a, b) => b.rating - a.rating).slice(0, 10)

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
        <h2>NEW COLLECTIONS</h2>
        <div className="cloth-item">
          {newCollect.map((item, index) => {
             return <Item key={index} id={item.id} name={item.name} image={item.ProductImage[0].image_url} rating={item.rating} new_price={item.price} description={item.description} />;
          })}
        </div>
      </div>
    </>
  );
}
