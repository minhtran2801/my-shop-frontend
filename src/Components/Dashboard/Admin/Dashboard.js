import React, { useEffect } from "react";
import AdminDashboardLayout from "../../Layout/AdminDashboardLayout";
import { isAuthenticated } from "../../../api/customerAPIs";

const AdminDashboard = () => {
  const {
    user: { f_name, l_name, email, role },
  } = isAuthenticated();

  useEffect(() => {
    document.title = "Admin dashboard";
  }, []);

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <div className="card-header">
          <h3>My Account</h3>
          <ul className="list-group">
            <li className="list-group-item">{f_name}</li>
            <li className="list-group-item">{l_name}</li>
            <li className="list-group-item">{email}</li>
            <li className="list-group-item">
              {role === 1 ? "Admin" : "Registered user"}
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return <AdminDashboardLayout>{adminInfo()}</AdminDashboardLayout>;
};

export default AdminDashboard;
