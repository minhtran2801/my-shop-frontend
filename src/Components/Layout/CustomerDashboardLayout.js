import React from "react";
import Navbar from "../Navbar/Navbar";
import CustomerSidebar from "../Dashboard/Customer/CustomerSidebar";

const CustomerDashboardLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="grid-box">
        <div className="bg-image"></div>
        <div className="center-box container rounded bg-white mt-5 mb-5 border">
          <div className="row flex-nowrap">
            <div className="col-auto col-md-5 col-lg-4 col-xl-3 px-sm-2 px-0 bg-white border-end">
              <CustomerSidebar />
            </div>
            <div className="col px-3 pt-2">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardLayout;
