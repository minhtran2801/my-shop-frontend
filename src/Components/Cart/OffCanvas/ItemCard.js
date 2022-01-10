import React, { useEffect, useState } from "react";
import { API } from "../../../config";
import ItemInfo from "./ItemInfo";

const ItemCard = ({ item, handleRemove, handleQuantity, showQuantity }) => {
  const [currentItem, setCurrentItem] = useState(item);

  useEffect(() => {
    setCurrentItem(item);
  }, [item]);

  const handleRemoveMiddleware = () => {
    handleRemove(item._id);
  };

  const handleQuantityMiddleware = () => {
    handleQuantity();
  };

  return (
    <div className="container mb-2">
      <div className="row">
        <div className="col-4 px-0">
          <div className="bg-light">
            <img
              src={`${API}/products/photo/${item._id}`}
              alt={item.name}
              className="mb-3 product-img"
            />
          </div>
        </div>
        <div className="col-6">
          {showQuantity ? (
            <div>
              <p className="item-name">{item.name}</p>
              <p>Quantity: {item.purchase_quantity}</p>
            </div>
          ) : (
            <ItemInfo
              item={currentItem}
              handleRemove={handleRemoveMiddleware}
              handleQuantity={handleQuantityMiddleware}
            />
          )}
        </div>
        <div className="col-2">
          <b>${item.price}</b>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
