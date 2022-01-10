import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import Cart from "./Cart";
import PaymentForm from "./PaymentForm";

const Payment = () => {
  const history = useHistory();
  const userId = history.location.state.userId;
  const token = history.location.state.token;
  const data = history.location.state.data;
  const cartItems = history.location.state.cartItems;
  const info = history.location.state.info;

  useEffect(() => {
    document.title = "Payment";
  }, []);

  return (
    <HomeLayout>
      <div className="container mt-5">
        {cartItems.length > 0 ? (
          <div className="row d-flex justify-content-between flex-column-reverse flex-lg-row">
            <div className="col-lg-7 col-auto">
              <PaymentForm
                data={data}
                cartItems={cartItems}
                userId={userId}
                token={token}
                info={info}
              />
            </div>
            <div className="col-lg-5 col-auto">
              <Cart />
            </div>
          </div>
        ) : (
          <div>NO ITEMS</div>
        )}
      </div>
    </HomeLayout>
  );
};

export default Payment;
