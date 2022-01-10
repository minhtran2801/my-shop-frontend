import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  isAuthenticated,
  readProfile,
  updateProfile,
  updateProfileLocal,
} from "../../../api/customerAPIs";
import CustomerDashboardLayout from "../../Layout/CustomerDashboardLayout";

const EditProfile = () => {
  const [profile, setProfile] = useState({
    f_name: "",
    l_name: "",
    email: "",
    success: false,
  });
  const { user, token } = isAuthenticated();
  const { f_name, l_name, email, success } = profile;

  const init = () => {
    readProfile(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProfile({
          f_name: data.f_name,
          l_name: data.l_name,
          email: data.email,
        });
      }
    });
  };

  useEffect(() => {
    document.title = "Edit Profile";
    init();
    // eslint-disable-next-line
  }, []);

  const handleChange = (name) => (e) => {
    setProfile({
      ...profile,
      [name]: e.target.value,
      success: false,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    updateProfile(user._id, token, profile).then((data) => {
      if (data.error) {
        setProfile({
          ...profile,
          success: false,
        });
      } else {
        updateProfileLocal(data, () => {
          setProfile({
            ...profile,
            f_name: data.f_name,
            l_name: data.l_name,
            email: data.email,
            success: true,
          });
        });
      }
    });
  };

  const redirectUser = () => {
    if (success) {
      return <Redirect to="/customer/account" />;
    }
  };

  // Starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();

  const CustomerInfo = () => {
    return (
      <div className="card mb-5">
        <div className="card-header">
          <h3>Edit Profile</h3>
          <hr />
          <form onSubmit={onFormSubmit} className="needs-validation" noValidate>
            {/* FIRST NAME */}
            <div className="form-outline mb-4">
              <label htmlFor="inputFirstName" className="form-label">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputFirstName"
                placeholder="First name"
                value={f_name}
                onChange={handleChange("f_name")}
                required
              />
              <div className="invalid-feedback">First name is required.</div>
            </div>
            {/* LAST NAME */}
            <div className="form-outline mb-4">
              <label htmlFor="inputLastName" className="form-label">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLastName"
                placeholder="Last name"
                value={l_name}
                onChange={handleChange("l_name")}
                required
              />
              <div className="invalid-feedback">Last name is required.</div>
            </div>
            {/* EMAIL */}
            <div className="form-outline mb-4">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="inputEmail"
                placeholder="Email"
                value={email}
                onChange={handleChange("email")}
                required
              />
              <div className="invalid-feedback">Email is required.</div>
            </div>

            <div className="d-grid gap-2 col-6 mx-auto w-100">
              <button
                type="submit"
                className="authbtn btn btn-dark btn-block btn-lg gradient-custom-4 text-white w-100"
              >
                Update profile
              </button>
            </div>
          </form>
          {redirectUser()}
        </div>
      </div>
    );
  };

  return <CustomerDashboardLayout>{CustomerInfo()}</CustomerDashboardLayout>;
};

export default EditProfile;
