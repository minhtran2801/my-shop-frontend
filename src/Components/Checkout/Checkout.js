import { useEffect, useState } from "react";
import { getBraintreeClientToken } from "../../api/braintreeAPIs";
import { isAuthenticated } from "../../api/customerAPIs";
import { getCartItems } from "../Cart/cartHelpers";
import HomeLayout from "../Layout/HomeLayout";
import Cart from "./Cart";
import AddressForm from "./AddressForm";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = () => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    document.title = "Check out";
    getToken();
    setCartItems(getCartItems());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const showLoading = () => {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  };

  return (
    <HomeLayout>
      <div className="container mt-5">
        {cartItems.length > 0 ? (
          <div className="row d-flex justify-content-between flex-column-reverse flex-lg-row">
            <div className="col-lg-7 col-auto">
              {data.clientToken !== null ? (
                <AddressForm
                  data={data}
                  cartItems={cartItems}
                  userId={userId}
                  token={token}
                />
              ) : (
                showLoading()
              )}
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

export default Checkout;
