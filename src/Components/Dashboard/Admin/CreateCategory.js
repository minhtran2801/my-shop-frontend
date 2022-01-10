import React, { useEffect, useState } from "react";
import AdminDashboardLayout from "../../Layout/AdminDashboardLayout";
import { isAuthenticated } from "../../../api/customerAPIs";
import { createCategory } from "../../../api/adminAPIs";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and info from localstorage
  const { user, token } = isAuthenticated();

  useEffect(() => {
    document.title = "Create Category";
  }, []);

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    setName(e.target.value);
  };

  const clearFields = () => {
    setName("");
    setCurrentName("");
    setError("");
    setSuccess("");
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Fetch create/category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
        setCurrentName(name);
        setName("");
      } else {
        setSuccess(true);
        setError("");
        setName("");
        setCurrentName(data.data.name);
      }
    });
  };

  const showSuccess = () => {
    if (success) {
      return (
        <div class="alert alert-success" role="alert">
          Category {currentName} is successfully created.
        </div>
      );
    }
  };

  const showError = () => {
    if (error) {
      return (
        <div class="alert alert-danger" role="alert">
          {currentName} already exists in category.
        </div>
      );
    }
  };

  const newCategoryForm = (
    <form onSubmit={onFormSubmit}>
      <div className="row">
        <div className="col-9">
          <div className="content-header pt-4 px-3">
            <h1 className="content-title">
              <span>Create New Category</span>
            </h1>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="pt-4 px-3">
            <div className="card mb-4">
              <div className="card-header bg-white">
                <h4>Category Information</h4>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  {showError()}
                  {showSuccess()}
                  <label htmlFor="categoryName" className="form-label">
                    Category Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Category name"
                    value={name}
                    autoFocus
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn btn-success btn-md rounded font-sm hover-up w-100"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={clearFields}
                    className="btn btn-outline-secondary rounded font-sm mt-3 text-body hover-up w-100"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );

  return <AdminDashboardLayout>{newCategoryForm}</AdminDashboardLayout>;
};

export default CreateCategory;
