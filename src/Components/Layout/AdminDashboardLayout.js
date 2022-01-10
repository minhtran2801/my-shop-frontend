import React from "react";
import Navbar from "../Navbar/Navbar";
import AdminSidebar from "../Dashboard/Admin/AdminSidebar";

const AdminDashboardLayout = ({ children }) => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="row flex-nowrap bg-light">
        <div className="col-auto col-md-4 col-lg-3 col-xl-2 px-sm-2 px-0 bg-white border-end">
          <AdminSidebar />
        </div>
        <div className="col px-3 pt-2 children-width">{children}</div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
