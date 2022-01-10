import React, { useState } from "react";
import { API } from "../../config";
import InfoLayout from "../Layout/InfoLayout";
import { addItem } from "../Cart/cartHelpers";

const ProductInfo = ({ product }) => {
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    addItem(product, () => {
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
      }, 1000);
    });
  };

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-5">
          <div className="bg-light">
            <img
              src={`${API}/products/photo/${product._id}`}
              alt={product.name}
              className="mb-3 product-img"
            />
          </div>
        </div>
        <div className="col-md-7">
          <div>
            <h2>{product.name}</h2>
            <p className="fs-5">$ {product.price.toFixed(2)}</p>
          </div>
          <div className="py-3">
            {product.quantity > 0 ? (
              <button
                type="button"
                onClick={addToCart}
                className={
                  added
                    ? "added-btn btn btn-success btn-lg px-3 py-2"
                    : "cart-btn btn btn-dark btn-lg px-3 py-2"
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
          <InfoLayout
            heading="General Information"
            content={product.description}
          />
          <InfoLayout heading="Ingredients" content={product.ingredients} />
          <InfoLayout heading="Directions" content={product.directions} />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
