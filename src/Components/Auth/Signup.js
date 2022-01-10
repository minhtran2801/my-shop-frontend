import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../Layout/AuthLayout";
import { signUpUser } from "../../api/customerAPIs";

const Signup = () => {
  const [values, setValues] = useState({
    f_name: "",
    l_name: "",
    password: "",
    email: "",
    showPassword: false,
    f_name_error: "",
    l_name_error: "",
    password_error: "",
    email_error: "",
    success: false,
  });

  const {
    f_name,
    l_name,
    email,
    password,
    showPassword,
    f_name_error,
    l_name_error,
    email_error,
    password_error,
    success,
  } = values;

  useEffect(() => {
    document.title = "Sign in";
  }, []);

  const handleChange = (element_name) => (event) => {
    setValues({ ...values, [element_name]: event.target.value });
  };

  const handleShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const onCopyPaste = (event) => {
    event.preventDefault();
  };

  const successRegister = () => {
    setValues({
      ...values,
      f_name: "",
      l_name: "",
      email: "",
      password: "",
      f_name_error: "",
      l_name_error: "",
      email_error: "",
      password_error: "",
      success: true,
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    signUpUser({
      f_name: f_name,
      l_name: l_name,
      email: email,
      password: password,
    }).then((data) => {
      if (data.errors) {
        setValues({
          ...values,
          f_name_error: data.f_name,
          l_name_error: data.l_name,
          email_error: data.email,
          password_error: data.password,
          email: data.email.length > 0 ? "" : email,
          password: data.password.length > 0 ? "" : "",
          success: false,
        });
      } else {
        successRegister();
      }
    });
  };

  const signUpForm = () => (
    <section>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="card">
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">
                Create an account
              </h2>

              <form onSubmit={onFormSubmit}>
                {/* FIRST NAME */}
                <div className="form-outline mb-4">
                  <label
                    htmlFor="inputFirstName"
                    className={`form-label ${
                      f_name_error.length > 0 ? "invalidText" : "validText"
                    }`}
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${
                      f_name_error.length > 0 ? "invalidBorder" : "validBorder"
                    }`}
                    id="inputFirstName"
                    placeholder="First name"
                    value={f_name}
                    onChange={handleChange("f_name")}
                  />
                  {f_name_error.length > 0 && (
                    <span className="form-text invalidText">
                      <i
                        className="fas fa-exclamation-circle fa-fw"
                        aria-hidden="true"
                      ></i>

                      {f_name_error}
                    </span>
                  )}
                </div>
                {/* LAST NAME */}
                <div className="form-outline mb-4">
                  <label
                    htmlFor="inputLastName"
                    className={`form-label ${
                      l_name_error.length > 0 ? "invalidText" : "validText"
                    }`}
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${
                      l_name_error.length > 0 ? "invalidBorder" : "validBorder"
                    }`}
                    id="inputLastName"
                    placeholder="Last name"
                    value={l_name}
                    onChange={handleChange("l_name")}
                  />
                  {f_name_error.length > 0 && (
                    <span className="form-text invalidText">
                      <i
                        className="fas fa-exclamation-circle fa-fw"
                        aria-hidden="true"
                      ></i>

                      {f_name_error}
                    </span>
                  )}
                </div>
                {/* EMAIL */}
                <div className="form-outline mb-4">
                  <label
                    htmlFor="inputEmail"
                    className={`form-label ${
                      email_error.length > 0 ? "invalidText" : "validText"
                    }`}
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className={`form-control  ${
                      email_error.length > 0 ? "invalidBorder" : "validBorder"
                    }`}
                    id="inputEmail"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleChange("email")}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                  {email_error.length > 0 && (
                    <span className="form-text invalidText">
                      <i
                        className="fas fa-exclamation-circle fa-fw"
                        aria-hidden="true"
                      ></i>

                      {email_error}
                    </span>
                  )}
                </div>
                {/* PASSWORD */}
                <div className="form-outline mb-4">
                  <label
                    htmlFor="inputPassword"
                    className={`form-label ${
                      password_error.length > 0 ? "invalidText" : "validText"
                    }`}
                  >
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control  ${
                        password_error.length > 0
                          ? "invalidBorder"
                          : "validBorder"
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
                        className={`fas fa-eye fa-fw ${
                          showPassword ? "d-none" : "d-inline-block"
                        }`}
                        id="show_eye"
                      ></i>
                      <i
                        className={`fas fa-eye-slash fa-fw ${
                          showPassword ? "d-inline-block" : "d-none"
                        }`}
                        id="hide_eye"
                      ></i>
                    </button>
                  </div>
                  <div
                    id="passwordHelp"
                    className={`form-text ${
                      password_error.length > 0 ? "d-none" : "d-inline"
                    }`}
                  >
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
                  {password_error.length > 0 && (
                    <span className="form-text invalidText">
                      <i
                        className="fas fa-exclamation-circle fa-fw"
                        aria-hidden="true"
                      ></i>

                      {password_error}
                    </span>
                  )}
                </div>

                <div className="d-grid gap-2 col-6 mx-auto w-100">
                  <button
                    type="submit"
                    className="authbtn btn btn-dark btn-block btn-lg gradient-custom-4 text-white w-100"
                  >
                    Register
                  </button>
                  <div className="form-text">
                    <p className="text-center text-muted">
                      By clicking Register, you agree to our{" "}
                      <a href="/signin" className="text-primary anchor-link">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </div>

                <p className="text-center text-muted mt-3 mb-0">
                  Have already an account ?{" "}
                  <a href="/signin" className="text-primary anchor-link">
                    Login
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Account is created successfully. Please <Link to="/signin">Sign In</Link>.
    </div>
  );

  return (
    <AuthLayout>
      {showSuccess()}
      {signUpForm()}
    </AuthLayout>
  );
};

export default Signup;
