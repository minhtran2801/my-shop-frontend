import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signOutUser } from "../../../api/customerAPIs";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {
      backgroundColor: "#cee6e4",
    };
  } else {
    return {
      backgroundColor: "white",
    };
  }
};

const SideBar = ({ history }) => {
  return (
    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-4 text-dark min-vh-100">
      <ul
        className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-sm-star"
        id="adminSidebar"
      >
        <li className="nav-item fs-5">
          <Link
            className="sidebar-item nav-link text-dark"
            style={isActive(history, "/admin/account")}
            to="/admin/account"
          >
            <i className="fas fa-tachometer-alt fa-fw" aria-hidden="true"></i>
            <span className="ms-1 d-none d-md-inline">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item fs-5 pt-4">
          <Link
            className="sidebar-item nav-link text-dark"
            style={isActive(history, "/admin/order/list")}
            to="/admin/order/list"
          >
            <i className="fas fa-list fa-fw" aria-hidden="true"></i>
            <span className="ms-1 d-none d-md-inline">Orders</span>
          </Link>
        </li>
        <li className="nav-item fs-5 pt-4">
          <Link
            className="sidebar-item nav-link text-dark"
            style={isActive(history, "/admin/products")}
            to="/admin/products"
          >
            <i className="fas fa-warehouse fa-fw" aria-hidden="true"></i>{" "}
            <span className="ms-1 d-none d-md-inline">Products</span>
          </Link>
        </li>
        <li className="nav-item fs-5 pt-4">
          <Link
            className="sidebar-item nav-link text-dark"
            style={isActive(history, "/admin/category/create")}
            to="/admin/category/create"
          >
            <i className="fas fa-user fa-fw" aria-hidden="true"></i>{" "}
            <span className="ms-1 d-none d-md-inline">Create Category</span>
          </Link>
        </li>

        <li className="nav-item fs-5 pt-4">
          <Link
            className="sidebar-item nav-link text-dark"
            style={isActive(history, "/admin/product/create")}
            to="/admin/product/create"
          >
            <i className="fas fa-key fa-fw" aria-hidden="true"></i>{" "}
            <span className="ms-1 d-none d-md-inline">Create Product</span>
          </Link>
        </li>
        <li className="nav-item fs-5 pt-4">
          <div className="logout">
            <i className="fas fa-sign-out-alt fa-fw" aria-hidden="true"></i>{" "}
            <span
              className="ms-1 d-none d-md-inline"
              onClick={() =>
                signOutUser(() => {
                  history.push("/");
                })
              }
            >
              Log Out
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(SideBar);
