import React from "react";
import CustomerDashboardLayout from "../../Layout/CustomerDashboardLayout";

const AddressBook = () => {
  const addressBook = () => {
    return (
      <div className="card mb-5">
        <div className="card-header">
          <h3>Address Book</h3>
          <ul className="list-group">
            <li className="list-group-item">Name</li>
          </ul>
        </div>
      </div>
    );
  };

  return <CustomerDashboardLayout>{addressBook()}</CustomerDashboardLayout>;
};

export default AddressBook;
