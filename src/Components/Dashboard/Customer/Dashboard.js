import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../../api/customerAPIs";
import CustomerDashboardLayout from "../../Layout/CustomerDashboardLayout";

const CustomerDashboard = () => {
  const {
    user: { f_name, l_name, email },
  } = isAuthenticated();

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const customerInfo = () => {
    return (
      <div className="row pt-4 px-3">
        <div className="col-12">
          <h2>Account Information</h2>
          <hr />
        </div>
        <div className="block-content row pb-0">
          <div className="box-contact col-lg">
            <div className="box-title">
              <h4 className="d-block align-items-center text-dark text-decoration-none ">
                <span>Contact Information</span>
              </h4>
            </div>
            <div className="box-content">
              <p className="mb-0">
                {`${f_name} ${l_name}`}
                <br />
                {email}
              </p>
            </div>
            <div className="box-actions">
              <Link
                className="box-action-edit text-decoration-none"
                to="/customer/profile/update"
              >
                Edit Profile
              </Link>

              <Link
                className="box-action-change text-decoration-none"
                to="/customer/password/update"
              >
                Change Password
              </Link>
            </div>
          </div>
          <div className="box-newsletter col-lg">
            <div className="box-title">
              <h4 className="d-block align-items-center text-dark text-decoration-none ">
                <span>Newsletter</span>
              </h4>
            </div>
            <div className="box-content">
              <p className="mb-0">You are subscribing to our Weekly Deals!</p>
            </div>
            <div className="box-actions">
              <Link
                className="box-action-unsubscribe text-decoration-none"
                to="/customer/newsletter"
              >
                Unsubscribe
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const billingAddress = () => {
    return (
      <div className="row pt-4 px-3">
        <div className="col-12">
          <h2>Billing Address</h2>
          <hr />
        </div>
        <div className="block-content row pb-0">
          <div className="box-billing col-lg">
            <div className="box-title">
              <h4 className="d-block align-items-center text-dark text-decoration-none ">
                <span>Default Billing Address</span>
              </h4>
            </div>
            <div className="box-content">
              <p className="mb-0">
                Minh Tran <br />
                U17/92-96 Milton Street
                <br />
                Ashfield, New South Wales, 2131
                <br />
                Australia
              </p>
            </div>
            <div className="box-actions">
              <Link
                className="box-action-address text-decoration-none"
                to="/customer/address/update"
              >
                Edit Address
              </Link>
            </div>
          </div>
          <div className="box-shipping col-lg">
            <div className="box-title">
              <h4 className="d-block align-items-center text-dark text-decoration-none ">
                <span>Default Shipping Address</span>
              </h4>
            </div>
            <div className="box-content">
              <p className="mb-0">
                Minh Tran <br />
                U17/92-96 Milton Street
                <br />
                Ashfield, New South Wales, 2131
                <br />
                Australia
              </p>
            </div>
            <div className="box-actions">
              <Link
                className="box-action-address text-decoration-none"
                to="/customer/address/update"
              >
                Edit Address
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const myAccount = () => {
    return (
      <Fragment>
        <div className="row">
          <div className="col-12">
            <h1 className="pt-4 px-3">
              <span>My Account</span>
            </h1>
          </div>
          <div className="col-12">{customerInfo()}</div>
          <span>
            <hr className="bg-white" />
          </span>
          <div className="col-12">{billingAddress()}</div>
        </div>
      </Fragment>
    );
  };

  return <CustomerDashboardLayout>{myAccount()}</CustomerDashboardLayout>;
};

export default CustomerDashboard;
