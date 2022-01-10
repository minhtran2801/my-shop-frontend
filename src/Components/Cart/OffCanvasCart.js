import React, { useState, useEffect } from "react";
import { getCartItems, removeItem } from "./cartHelpers";
import ItemCard from "./OffCanvas/ItemCard";
import { Link, useHistory } from "react-router-dom";

const OffCanvasCart = ({ isShown }) => {
  let history = useHistory();

  const [cartItems, setCartItems] = useState([]);

  const getSubTotal = () => {
    return cartItems.reduce((previousTotal, currentItem) => {
      let sum =
        parseFloat(previousTotal) +
        currentItem.purchase_quantity * parseFloat(currentItem.price);
      return sum.toFixed(2);
    }, 0);
  };

  useEffect(() => {
    setCartItems(getCartItems());
  }, [isShown]);

  const handleRemove = (productId) => {
    removeItem(productId);
    setCartItems(getCartItems());
  };

  const handleQuantity = () => {
    setCartItems(getCartItems());
  };

  const handleCheckout = () => {
    if (history.location.pathname === "/checkout") {
      window.location.reload();
    }
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasCart"
      aria-labelledby="offcanvasCartLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasCartLabel">
          Your Cart
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        {cartItems.length > 0 ? (
          <div className="container">
            {cartItems.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                handleRemove={handleRemove}
                handleQuantity={handleQuantity}
                showQuantity={false}
              />
            ))}
            <hr />
            <div className="row">
              <div className="col-6">
                <h5 className="mb-0">Total</h5>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <b>${getSubTotal()}</b>
              </div>
            </div>
            <div className="mt-3">
              <Link to="/checkout">
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="btn btn-dark w-100"
                >
                  CHECKOUT
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div>Your cart is empty.</div>
        )}
      </div>
    </div>
  );
};

export default OffCanvasCart;
