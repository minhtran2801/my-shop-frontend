import React, { useState, useEffect } from "react";
import AdminDashboardLayout from "../../Layout/AdminDashboardLayout";
import { isAuthenticated } from "../../../api/customerAPIs";
import { listOrders } from "../../../api/orderAPIs";
import moment from "moment";
import { Link } from "react-router-dom";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((order) => {
      if (order.error) {
        console.log(order.error);
      } else {
        setOrders(order);
      }
    });
  };

  useEffect(() => {
    document.title = "Orders";
    loadOrders();
    // eslint-disable-next-line
  }, [user._id, token]);

  const showOrderLength = () => {
    return (
      <div className="card mb-5 order-card">
        <div className="card-header">
          <h1>Orders</h1>
          {orders.length > 0 ? (
            <div>
              <p>Total orders: {orders.length}</p>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Order ID</th>
                      <th scope="col">Email</th>
                      <th scope="col">Transaction ID</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Ordered By</th>
                      <th scope="col">Ordered On</th>
                      <th scope="col" className="text-center">
                        Status
                      </th>
                      <th scope="col">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{order._id}</th>
                          <td>{order.user.email}</td>
                          <td>{order.transaction_id}</td>
                          <td>${order.amount}</td>
                          <td>{order.user.f_name}</td>
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
                            <Link to={`/admin/order/${order._id}`}>
                              <i className="fas fa-edit"></i>
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
            <p>No orders</p>
          )}
        </div>
      </div>
    );
  };

  return <AdminDashboardLayout>{showOrderLength()}</AdminDashboardLayout>;
};

export default Order;
