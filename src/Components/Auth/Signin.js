import React, { useEffect, useState } from "react";
import AuthLayout from "../Layout/AuthLayout";
import {
  signInUser,
  authenticate,
  isAuthenticated,
} from "../../api/customerAPIs";
import { Redirect } from "react-router";

const Signin = ({ isCheckout }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
    error: "",
    loading: false,
    shouldRedirect: false,
  });

  useEffect(() => {
    document.title = "Sign in";
  }, []);

  const { email, password, showPassword, error, loading, shouldRedirect } =
    values;
  const { user } = isAuthenticated();

  const handleChange = (element_name) => (event) => {
    setValues({ ...values, [element_name]: event.target.value });
  };

  const handleShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const onCopyPaste = (event) => {
    event.preventDefault();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    signInUser({
      email: email,
      password: password,
    }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          email: "",
          password: "",
          error: data.error,
          loading: false,
        });
      } else {
        authenticate(data, () => {
          setValues({ ...values, shouldRedirect: true });
        });
      }
    });
  };

  const signInForm = () => (
    <section>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="card">
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Login</h2>

              <form onSubmit={onFormSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="inputEmail"
                    className={`form-label ${
                      error.length > 0 ? "invalidText" : "validText"
                    }`}
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className={`form-control form-control-lg ${
                      error.length > 0 ? "invalidBorder" : "validBorder"
                    }`}
                    id="inputEmail"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleChange("email")}
                  />
                  {error.length > 0 && (
                    <span className="invalidText">
                      <i
                        className="fas fa-exclamation-circle"
                        aria-hidden="true"
                      >
                        {" "}
                      </i>
                      {"   "}
                      {error}
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="inputPassword"
                    className={`form-label ${
                      error.length > 0 ? "invalidText" : "validText"
                    }`}
                  >
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control form-control-lg ${
                        error.length > 0 ? "invalidBorder" : "validBorder"
                      }`}
                      id="inputPassword"
                      aria-describedby="passwordHelp"
                      placeholder="Enter password"
                      value={password}
                      onChange={handleChange("password")}
                      onCopy={onCopyPaste}
                      onPaste={onCopyPaste}
                      onCut={onCopyPaste}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      id="showPassword"
                      onClick={handleShowPassword}
                    >
                      <i
                        className={`fas fa-eye ${
                          showPassword ? "d-none" : "d-inline-block"
                        }`}
                        id="show_eye"
                      ></i>
                      <i
                        className={`fas fa-eye-slash ${
                          showPassword ? "d-inline-block" : "d-none"
                        }`}
                        id="hide_eye"
                      ></i>
                    </button>
                  </div>
                  {error.length > 0 && (
                    <span className="invalidText">
                      <i
                        className="fas fa-exclamation-circle"
                        aria-hidden="true"
                      >
                        {" "}
                      </i>
                      {"   "}
                      {error}
                    </span>
                  )}
                </div>

                <div className="d-grid gap-2 col-6 mx-auto w-100">
                  <button
                    type="submit"
                    className="authbtn btn btn-dark btn-block btn-lg text-white w-100"
                  >
                    Login
                  </button>
                </div>

                <p className="text-center text-muted mt-5">
                  <a href="/signin" className="text-primary anchor-link">
                    Forgot your password?
                  </a>
                </p>
                <p className="text-center text-muted">
                  Create a new account?{" "}
                  <a href="/signup" className="text-primary anchor-link">
                    Sign up!
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const showLoading = () => {
    loading && (
      <div className="alert alert-info">
        <h2>LOADING...</h2>
      </div>
    );
  };

  const redirectUser = () => {
    if (shouldRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/account" />;
      } else if (user && !isCheckout) {
        return <Redirect to="/" />;
      } else {
        return <Redirect to="/checkout" />;
      }
    }
  };

  return (
    <AuthLayout>
      {signInForm()}
      {showLoading()}
      {redirectUser()}
    </AuthLayout>
  );
};
export default Signin;
