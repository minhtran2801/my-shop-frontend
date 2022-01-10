import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { emptyCart } from "../Cart/cartHelpers";
import { createOrder } from "../../api/orderAPIs";
import { processPayment } from "../../api/braintreeAPIs";

const PaymentForm = ({ userId, token, data, cartItems, info }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const getSubTotal = () => {
    return cartItems.reduce((previousTotal, currentItem) => {
      let sum =
        parseFloat(previousTotal) +
        currentItem.purchase_quantity * parseFloat(currentItem.price);
      return sum.toFixed(2);
    }, 0);
  };

  // Scroll to top on reload
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handlePurchase = () => {
    let nonce;
    setLoading(true);
    data.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodData: nonce,
          amount: getSubTotal(),
        };

        processPayment(userId, token, paymentData)
          .then((res) => {
            // Create order
            const order = {
              products: cartItems,
              transaction_id: res.transaction.id,
              amount: res.transaction.amount,

              f_name: info.f_name,
              l_name: info.l_name,
              email: info.email,
              address_line_1: info.address_line_1,
              address_line_2: info.address_line_2,
              city: info.city,
              state: info.state,
              postcode: info.postcode,
            };
            if (info.billing_address_line_1 === undefined) {
              order.billing_address_line_1 = info.address_line_1;
              order.billing_address_line_2 = info.address_line_2;
              order.billing_city = info.city;
              order.billing_state = info.state;
              order.billing_postcode = info.postcode;
            } else {
              order.billing_address_line_1 = info.billing_address_line_1;
              order.billing_address_line_2 = info.billing_address_line_2;
              order.billing_city = info.billing_city;
              order.billing_state = info.billing_state;
              order.billing_postcode = info.billing_postcode;
            }
            createOrder(userId, token, order);
            // Empty cart
            emptyCart(() => {
              setLoading(false);
              history.push({
                pathname: "/checkout/success",
                state: { transaction_id: res.transaction.id },
              });
            });
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      })
      .catch((error) => {
        setLoading(false);
        console.log("Dropin error: ", error);
      });
  };

  const showLoading = () => {
    let overlay = document.getElementsByClassName("loading-overlay")[0];
    overlay.classList.toggle("is-active");
  };

  return (
    <div>
      {loading && showLoading()}
      <div className="loading-overlay">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading ....</span>
        </div>
        <div>
          <p className="loading-text">Processing your payment</p>
        </div>
      </div>
      <h3>Payment</h3>
      <div className="pt-3">
        <DropIn
          options={{
            authorization: data.clientToken,
            paypal: { flow: "vault" },
          }}
          onInstance={(instance) => (data.instance = instance)}
        />
        <div className="d-flex justify-content-end pt-3">
          <button className="btn btn-dark" onClick={handlePurchase}>
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
