import React, { useEffect, useState } from "react";
import { changePassword, isAuthenticated } from "../../../api/customerAPIs";
import CustomerDashboardLayout from "../../Layout/CustomerDashboardLayout";

const ChangePassword = () => {
  const [values, setValues] = useState({
    password: "",
    confirm_password: "",
    error: false,
    success: false,
  });

  const { password, confirm_password, error, success } = values;

  const { user, token } = isAuthenticated();

  useEffect(() => {
    document.title = "Change My Password";
  }, []);

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    changePassword(user._id, token, values).then((data) => {
      if (data.error) {
        setValues({
          password: "",
          confirm_password: "",
          error: data.error,
          success: false,
        });
      } else {
        setValues({
          password: "",
          confirm_password: "",
          error: false,
          success: true,
        });
      }
    });
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger d-flex align-items-center"
        role="alert"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
          viewBox="0 0 16 16"
          role="img"
          aria-label="Warning:"
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        <div>{error}</div>
      </div>
    );
  };

  const showSuccess = () => {
    return (
      <div
        className="alert alert-success d-flex align-items-center"
        role="alert"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
          viewBox="0 0 16 16"
          role="img"
          aria-label="Warning:"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
        <div>Your password has been changed!</div>
      </div>
    );
  };

  const onCopyPaste = (event) => {
    event.preventDefault();
  };

  const PasswordForm = () => {
    return (
      <div className="card mb-5">
        <div className="card-header">
          <h3>Change Password</h3>
          <hr />
          {error && showError()}
          {success && showSuccess()}
          <form onSubmit={onFormSubmit} className="needs-validation" noValidate>
            {/* password */}
            <div className="form-outline mb-4">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
                value={password}
                onChange={handleChange("password")}
                onCopy={onCopyPaste}
                onPaste={onCopyPaste}
                onCut={onCopyPaste}
                required
              />
              <div className="invalid-feedback">Password is required.</div>
            </div>
            <div id="passwordHelp" className="form-text m-3">
              <div className="row">
                <div className="col-md">
                  • Minimum 6 character
                  <br />• 1 number
                </div>
                <div className="col-md">
                  • 1 lowercase character
                  <br />• 1 uppercase character
                </div>
              </div>
            </div>
            {/* confirm_password */}
            <div className="form-outline mb-4">
              <label htmlFor="inputConfirmPassword" className="form-label">
                Confirm password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputConfirmPassword"
                placeholder="Confirm your password"
                value={confirm_password}
                onChange={handleChange("confirm_password")}
                onCopy={onCopyPaste}
                onPaste={onCopyPaste}
                onCut={onCopyPaste}
                required
              />
              <div className="invalid-feedback">
                Please confirm your password
              </div>
            </div>

            <div className="d-grid gap-2 col-6 mx-auto w-100">
              <button
                type="submit"
                className="authbtn btn btn-dark btn-block btn-lg gradient-custom-4 text-white w-100"
              >
                Change my password
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return <CustomerDashboardLayout>{PasswordForm()}</CustomerDashboardLayout>;
};

export default ChangePassword;
