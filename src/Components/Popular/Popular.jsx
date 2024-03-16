import Item from "../Item/Item";
import { useEffect, useState } from "react";
import Skeleton from "../Skeleton/Skeleton";
import { useAuth } from "../../Context/AuthContext";

export default function Popular() {
  const { Product } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await Product();
        setData(products);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [Product]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (loading) {
    return (
      <div className="cloth-container">
        <Skeleton />
      </div>
    );
  }
  const womenProducts = data.filter((item) => item.Category.name === "Women");
  const popularWomenProducts = womenProducts.sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <>
      <div className="cloth-container">
        <h2>POPULAR IN WOMAN</h2>
        <div className="cloth-item">
          {popularWomenProducts.map((item, index) => (
            <Item key={index} id={item.id} name={item.name} image={item.ProductImage[0].image_url} rating={item.rating} new_price={item.price} description={item.description} />
          ))}
        </div>
      </div>
    </>
  );
}
