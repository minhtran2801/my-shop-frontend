import React, { useEffect, useState } from "react";
import { getOrderHistory, isAuthenticated } from "../../../api/customerAPIs";
import CustomerDashboardLayout from "../../Layout/CustomerDashboardLayout";
import { Link } from "react-router-dom";
import moment from "moment";

const DashboardOrder = () => {
  const [history, setHistory] = useState([]);

  const { user, token } = isAuthenticated();

  const init = () => {
    getOrderHistory(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    document.title = "Order History";
    init();
    // eslint-disable-next-line
  }, []);

  const orderHistory = () => {
    return (
      <div className="card mb-5">
        <div className="card-header">
          <h3>Order History</h3>
          {history.length > 0 ? (
            <div>
              <p>Total orders: {history.length}</p>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Order ID</th>
                      <th scope="col">Transaction ID</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Ordered On</th>
                      <th scope="col" className="text-center">
                        Status
                      </th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((order, index) => {
                      console.log(order);
                      return (
                        <tr key={index}>
                          <th scope="row">{order._id}</th>
                          <td>{order.transaction_id}</td>
                          <td>${order.amount}</td>
                          <td>{moment(order.createdAt).fromNow()}</td>
                          <td status={order.status}>
                            <div className="d-flex justify-content-center ">
                              <div
                                className={
                                  order.status === "Not processed"
                                    ? "status-tag-default"
                                    : `status-tag-${order.status}`
                                }
                              >
                                {order.status}
                              </div>
                            </div>
                          </td>
                          <td>
                            <Link to={`/customer/order/history/${order._id}`}>
                              View Order
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p>No history</p>
          )}
        </div>
      </div>
    );
  };

  return <CustomerDashboardLayout>{orderHistory()}</CustomerDashboardLayout>;
};

export default DashboardOrder;
