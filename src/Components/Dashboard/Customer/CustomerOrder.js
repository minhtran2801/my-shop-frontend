import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../../api/customerAPIs";
import { getSingleOrder } from "../../../api/orderAPIs";
import ItemCard from "../../Cart/OffCanvas/ItemCard";
import CustomerDashboardLayout from "../../Layout/CustomerDashboardLayout";

const CustomerOrder = (props) => {
  const [order, setOrder] = useState([]);
  const { user, token } = isAuthenticated();

  const loadSingleOrder = (orderId) => {
    getSingleOrder(orderId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrder(data);
      }
    });
  };

  useEffect(() => {
    const orderId = props.match.params.orderId;
    loadSingleOrder(orderId);
    // eslint-disable-next-line
  }, []);

  const Header = () => {
    return (
      <div className="card order-card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <header>
            <h1>Order Detail</h1>
            <p className="text-muted">Order No: #{order._id}</p>
          </header>
        </div>
      </div>
    );
  };

  const Detail = () => {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <h3 className="card-title text-center">Order Summary</h3>
          <div className="card-text">
            <hr />
          </div>
          {order.products !== undefined &&
            order.products.map((item, index) => (
              <ItemCard key={index} item={item} showQuantity={true} />
            ))}
          <hr />
          <div className="d-flex justify-content-end">
            <h5>Total: ${order.amount}</h5>
          </div>
        </div>
      </div>
    );
  };

  const Delivery = () => {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <h3 className="card-title text-center">Customer Information</h3>
          <div className="card-text">
            <hr />
          </div>
          {order.user !== undefined && (
            <div>
              <div>
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th scope="row">Name</th>
                      <td>
                        {order.user.f_name} {order.user.l_name}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Email</th>
                      <td>{order.user.email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <hr />
              <div>
                <h3 className="card-title text-center">Shipping Address</h3>
                <div className="box-content">
                  <p className="mb-0">
                    {order.address_line_2 !== undefined && (
                      <span>{order.address_line_2}/</span>
                    )}
                    {order.address_line_1}
                    <br />
                    {order.city}, {order.state}, {order.postcode}
                    <br />
                  </p>
                </div>
              </div>
              <hr />
              <div>
                <h3 className="card-title text-center">Billing Address</h3>
                <div className="box-content">
                  <p className="mb-0">
                    {order.billing_address_line_2 !== undefined && (
                      <span>{order.billing_address_line_2}/</span>
                    )}
                    {order.billing_address_line_1}
                    <br />
                    {order.billing_city}, {order.billing_state},{" "}
                    {order.billing_postcode}
                    <br />
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <CustomerDashboardLayout>
      <div className="container">
        <div className="row">
          <Header />
        </div>
        <div className="row py-3">
          <div className="col-lg-8 item-card">
            <Detail />
          </div>
          <div className="col-lg-4">
            <Delivery />
          </div>
        </div>
      </div>
    </CustomerDashboardLayout>
  );
};

export default CustomerOrder;
