import React, { useState } from "react";
import { API } from "../../config";
import { addItem } from "../Cart/cartHelpers";

const ShowImage = ({ product, url }) => {
  const [added, setAdded] = useState(false);
  const [btnDisplay, setBtnDisplay] = useState({
    display: "none",
    backgroundColor: "none",
  });

  const showBtn = (e) => {
    e.preventDefault();
    setBtnDisplay({
      display: "block",
      backgroundImage:
        "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
    });
  };

  const hideBtn = (e) => {
    e.preventDefault();
    setBtnDisplay({ display: "none" });
  };

  const addToCart = (e) => {
    e.preventDefault();
    addItem(product, () => {
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
      }, 1000);
    });
  };

  return (
    <div className="img-wrapper" onMouseEnter={showBtn} onMouseLeave={hideBtn}>
      <img
        src={`${API}/${url}/photo/${product._id}`}
        alt={product.name}
        className="mb-3 product-img"
      />
      <div className="img-overlay" style={btnDisplay}>
        {product.quantity > 0 ? (
          <button
            type="button"
            onClick={addToCart}
            className={
              added
                ? "added-btn btn btn-success px-3 py-2"
                : "cart-btn btn btn-dark px-3 py-2"
            }
          >
            {added ? (
              <div>
                <i className="fas fa-check fa-fw me-2"></i>Added
              </div>
            ) : (
              <div>
                <i className="fas fa-cart-plus fa-fw me-2"></i>
                Add To Cart
              </div>
            )}
          </button>
        ) : (
          <button
            type="button"
            className="cart-btn btn btn-dark btn-lg px-3 py-2"
            disabled
          >
            SOLD OUT
          </button>
        )}
      </div>
    </div>
  );
};

export default ShowImage;
