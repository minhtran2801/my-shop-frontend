import React, { useEffect, useState } from "react";
import { updateQuantity } from "../cartHelpers";

const ItemInfo = ({ item, handleRemove, handleQuantity }) => {
  const [quantity, setQuantity] = useState(item.purchase_quantity);

  const onDecrement = (e) => {
    e.preventDefault();
    setQuantity(parseInt(quantity) - 1);
  };

  const onIncrement = (e) => {
    e.preventDefault();
    setQuantity(parseInt(quantity) + 1);
  };

  const onValueChange = (e) => {
    e.preventDefault();
    setQuantity(parseInt(e.target.value));
  };

  useEffect(() => {
    updateQuantity(item._id, quantity);
    handleQuantity();
    if (quantity === 0) {
      handleRemove();
    }
  }, [quantity]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setQuantity(item.purchase_quantity);
  }, [item]);

  return (
    <div className="mb-2">
      <p className="item-name">{item.name}</p>
      <div className="quantity-modifier input-group input-group-sm">
        <button
          className="btn btn-outline-dark"
          type="button"
          onClick={onDecrement}
        >
          -
        </button>
        <input
          type="text"
          className="form-control quantity-input text-center"
          placeholder=""
          value={quantity}
          onChange={onValueChange}
          aria-label="quantity input"
        />
        <button
          className="btn btn-outline-dark"
          type="button"
          onClick={onIncrement}
        >
          +
        </button>

        <span className="remove-item" onClick={handleRemove}>
          <small>
            <i className="fas fa-times me-1"></i>Remove item
          </small>
        </span>
      </div>
    </div>
  );
};
export default ItemInfo;
