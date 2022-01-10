import React, { useEffect } from "react";
import HomeLayout from "../Layout/HomeLayout";
import { useHistory } from "react-router-dom";

const SuccessCheckout = () => {
  let history = useHistory();

  // Scroll to top on reload
  useEffect(() => {
    document.title = "Success checkout";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleShopping = () => {
    history.push("/products");
  };

  return (
    <HomeLayout>
      <div className="container d-flex flex-column justify-content-center align-items-center thankyou-modal">
        <div>
          <i className="far fa-check-circle thankyou-icon"></i>
        </div>
        <div className="pt-5">
          <p className="thankyou-title">
            Thank you for your order. Your order number is
            {history.location.state.transaction_id}!
          </p>
        </div>
        <div className="pt-3">
          <p className="thankyou-text">
            Please check your email for order confirmation
          </p>
        </div>
        <div className="pt-3">
          <button className="btn btn-lg btn-success" onClick={handleShopping}>
            Continue shopping
          </button>
        </div>
      </div>
    </HomeLayout>
  );
};

export default SuccessCheckout;
