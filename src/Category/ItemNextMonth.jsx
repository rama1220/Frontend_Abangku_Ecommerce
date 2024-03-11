import NewData from '../Components/Assets/itemNxtMonth/DataNew.js';
import ItemNext from '../Components/Item/ItemNext';
export default function ItemNextMonth() {
  return (
    <>
      <div className="cloth-container">
        <h2>New Item Next Month</h2>
        <div className="cloth-item-next">
          {NewData.map((item, id) => {
            return <ItemNext key={id} id={item.id}  image={item.image} />;
          })}
        </div>
      </div>
    </>
  );

}
