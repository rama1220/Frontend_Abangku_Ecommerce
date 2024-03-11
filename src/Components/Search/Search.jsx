import { useAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";
import ItemCategory from "../Item/ItemCategory";

export default function Search() {
  const [data, setData] = useState([]);
  const { Search, term } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await Search(term);
        setData(products);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [Search, term]);

  return (
    <>
      <div className="cloth-category">
        <h2>Search result Products</h2>
        <h5 className="showing">
          <span>Showing </span> {data.length} of the products
        </h5>
        <div className="cloth-item-cetegory">
          {data.length > 0 ? (
            data.map((item, index) => <ItemCategory key={index} id={item.id} name={item.name} image={item.ProductImage[0].image_url} rating={item.rating} new_price={item.price} description={item.description} />)
          ) : (
            <h2>Product Not Found</h2>
          )}
        </div>
      </div>
    </>
  );
}
