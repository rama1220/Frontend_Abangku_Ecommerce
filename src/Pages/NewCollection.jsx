import { useEffect, useState } from "react";
import ItemCategory from "../Components/Item/ItemCategory";
import { useAuth } from "../Context/AuthContext";
import SkeletonMedium from "../Components/Skeleton/SkeletonMedium";
export default function NewCollection() {
  const { Product, filter } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const newCollect = data.slice(0, 27).sort((a, b) => b.updated_at - a.updated_at);

  const totalProduct = newCollect.reduce((acc) => {
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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [Product, filter]);
  if (loading) {
    return (
      <div className="item-skeleton">
        <SkeletonMedium />
      </div>
    );
  }
  return (
    <>
      <div className="cloth-category">
        <h2>NEW COLLECTIONS</h2>
        <div className="result-title">
          <h5 className="showing">
            <span>Showing </span> 1 -{totalProduct} of the products new collection
          </h5>
        </div>
        <div className="cloth-item-cetegory">
          {newCollect.map((item, index) => {
            return <ItemCategory key={index} id={item.id} name={item.name} image={item.ProductImage[0].image_url} rating={item.rating} new_price={item.price} description={item.description} />;
          })}
        </div>
      </div>
    </>
  );
}
