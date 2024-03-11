import { useState,useEffect } from "react";
import ItemCategory from "../Components/Item/ItemCategory";
import { useAuth } from "../Context/AuthContext";

export default function BestSeller() {
 const {Product, filter} = useAuth();
   const [data, setData] = useState([]);
 
  const best = data.slice(0, 15).sort((a, b) => b.rating - a.rating);
  const totalProduct = best.reduce((acc) => {
    return acc + 1;
  }, 0);

useEffect(() => {
  Product()
    .then((products) => {
      let sortedProducts = [...products];
      if (filter === "Newest Product") {
        sortedProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      } else if (filter === "Most Expensive") {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else if (filter === "Cheapest") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (filter === "Alphabets A-Z") {
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filter === "Alphabets Z-A") {
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      }
      setData(sortedProducts);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}, [Product, filter]);

  return (
    <>

        <div className="cloth-category">
          <h2>Best Clothing Products</h2>
          <h5 className="showing">
            <span>Showing </span> 1 -{totalProduct} of the products best seller
          </h5>
          <div className="cloth-item-cetegory">
            {best.map((item, index) => {
              return <ItemCategory key={index} id={item.id} name={item.name} image={item.ProductImage[0].image_url} rating={item.rating} new_price={item.price} description={item.description} />;
            })}
          </div>
        </div>
    </>
  );
}
