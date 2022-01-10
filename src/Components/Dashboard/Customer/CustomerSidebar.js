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
      <div className="w-100 fs-5 ">
        <Link
          className="d-block align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
          to="/customer/account"
        >
          <div className="ms-2 mt-3">
            <h3>
              <i className="fas fa-cog fa-fw"></i>
              <span className="ms-2 d-none d-md-inline">Settings</span>
            </h3>
          </div>
        </Link>
        <span>
          <hr />
        </span>
      </div>
      <ul
        className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-sm-star w-100"
        id="customerSidebar"
      >
        <li className="nav-item fs-5">
          <Link
            className="sidebar-item nav-link text-dark"
            style={isActive(history, "/customer/account")}
            to="/customer/account"
          >
            <i className="fas fa-tachometer-alt fa-fw" aria-hidden="true"></i>
            <span className="ms-1 d-none d-md-inline">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item fs-5 pt-4">
          <Link
            className="sidebar-item nav-link text-dark"
            style={isActive(history, "/customer/address")}
            to="/customer/address"
          >
            <i className="fas fa-address-book fa-fw" aria-hidden="true"></i>
            <span className="ms-1 d-none d-md-inline">Address Book</span>
          </Link>
        </li>
        <li className="nav-item fs-5 pt-4 ">
          <Link
            className="sidebar-item nav-link text-dark"
            style={isActive(history, "/customer/profile/update")}
            to="/customer/profile/update"
          >
            <i className="fas fa-user fa-fw" aria-hidden="true"></i>{" "}
            <span className="ms-1 d-none d-md-inline">Edit Profile</span>
          </Link>
        </li>
        <li className="nav-item fs-5 pt-4">
          <Link
            className="sidebar-item nav-link text-dark"
            style={isActive(history, "/customer/password/update")}
            to="/customer/password/update"
          >
            <i className="fas fa-key fa-fw" aria-hidden="true"></i>{" "}
            <span className="ms-1 d-none d-md-inline">Change Password</span>
          </Link>
        </li>
        <li className="nav-item fs-5 pt-4">
          <Link
            className="sidebar-item nav-link text-dark"
            style={isActive(history, "/customer/order/history")}
            to="/customer/order/history"
          >
            <i className="fas fa-list fa-fw" aria-hidden="true"></i>{" "}
            <span className="ms-1 d-none d-md-inline">Order History</span>
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
