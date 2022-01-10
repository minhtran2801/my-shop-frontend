import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../api/customerAPIs";
import { useHistory } from "react-router-dom";

const AddressForm = ({ userId, token, data, cartItems }) => {
  const history = useHistory();
  const states = ["NSW", "VIC", "SA", "WA", "NT", "QLD", "TAS"];
  const [checked, setChecked] = useState(true);
  const [error, setError] = useState(false);
  const [values, setValues] = useState({
    f_name: "",
    l_name: "",
    email: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    postcode: "",
    billing_address_line_1: "",
    billing_address_line_2: "",
    billing_city: "",
    billing_state: "",
    billing_postcode: "",
  });

  const {
    f_name,
    l_name,
    email,
    address_line_1,
    address_line_2,
    city,
    state,
    postcode,
    billing_address_line_1,
    billing_address_line_2,
    billing_city,
    billing_state,
    billing_postcode,
  } = values;

  useEffect(() => {
    // Reset scroll when offcanvas backdrops and scroll to top
    document.body.style.overflowY = "auto";
    document.body.style.paddingRight = 0;
    window.history.scrollRestoration = "manual";

    // Load user info
    let user = isAuthenticated().user;
    setValues({ f_name: user.f_name, l_name: user.l_name, email: user.email });

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            setError(true);
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  }, []);

  const handleChange = (element_name) => (event) => {
    setValues({ ...values, [element_name]: event.target.value });
  };

  const handleCheck = () => {
    setChecked(!checked);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    setError(false);

    // Send to payment
    if (!error) {
      history.push({
        pathname: "/checkout/payment",
        state: {
          userId: userId,
          token: token,
          data: data,
          cartItems: cartItems,
          info: values,
        },
      });
    }
  };

  return (
    <div>
      <form
        className="row g-3 needs-validation"
        onSubmit={onFormSubmit}
        noValidate
      >
        <div className="col-md-12">
          <h3>Customer Information</h3>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">
            First name *
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            value={f_name || ""}
            onChange={handleChange("f_name")}
            required
          />
          <div className="invalid-feedback">First name is required</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">
            Last name *
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom02"
            value={l_name || ""}
            onChange={handleChange("l_name")}
            required
          />
          <div className="invalid-feedback">Last name is required</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustomUsername" className="form-label">
            Email *
          </label>
          <div className="input-group has-validation">
            <input
              type="text"
              className="form-control"
              id="validationCustomUsername"
              aria-describedby="inputGroupPrepend"
              value={email || ""}
              onChange={handleChange("email")}
              required
            />
            <div className="invalid-feedback">Email is required</div>
          </div>
        </div>
        {/* Shipping Address */}
        <div className="col-md-12 pt-3">
          <h3>Shipping address</h3>
        </div>
        <div className="col-md-12">
          <label htmlFor="validationCustom03" className="form-label">
            Address line 1 *
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom03"
            value={address_line_1 || ""}
            placeholder="123 Arthur St"
            onChange={handleChange("address_line_1")}
            required
          />
          <div className="invalid-feedback">Address is required</div>
        </div>
        <div className="col-md-12">
          <label htmlFor="validationCustom04" className="form-label">
            Address line 2
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom04"
            value={address_line_2 || ""}
            placeholder="Unit 12/Apt 12/Flat 12"
            onChange={handleChange("address_line_2")}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom05" className="form-label">
            City *
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom05"
            value={city || ""}
            placeholder="Sydney"
            onChange={handleChange("city")}
            required
          />
          <div className="invalid-feedback">City is required</div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom06" className="form-label">
            State *
          </label>
          <select
            className="form-select"
            id="validationCustom06"
            value={state || ""}
            onChange={handleChange("state")}
            required
          >
            <option value="">State</option>
            {states.map((state_name, index) => (
              <option key={index} value={state_name}>
                {state_name}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">Please select a valid state.</div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom07" className="form-label">
            Postcode *
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom07"
            value={postcode || ""}
            placeholder="2000"
            onChange={handleChange("postcode")}
            required
          />
          <div className="invalid-feedback">Postcode is required</div>
        </div>
        {/* Billing address */}
        <div className="col-md-12 pt-3">
          <h3>Billing address</h3>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultChecked={checked}
              onChange={handleCheck}
              id="invalidCheck"
            />
            <label className="form-check-label" htmlFor="invalidCheck">
              Same as shipping address
            </label>
          </div>
        </div>
        {!checked && (
          <>
            <div className="col-md-12">
              <label htmlFor="validationCustom08" className="form-label">
                Address line 1 *
              </label>
              <input
                type="text"
                className="form-control"
                id="validationCustom08"
                value={billing_address_line_1 || ""}
                placeholder="123 Arthur St"
                onChange={handleChange("billing_address_line_1")}
                required
              />
              <div className="invalid-feedback">Address is required</div>
            </div>
            <div className="col-md-12">
              <label htmlFor="validationCustom09" className="form-label">
                Address line 2
              </label>
              <input
                type="text"
                className="form-control"
                id="validationCustom09"
                value={billing_address_line_2 || ""}
                placeholder="Unit 12/Apt 12/Flat 12"
                onChange={handleChange("billing_address_line_2")}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="validationCustom10" className="form-label">
                City *
              </label>
              <input
                type="text"
                className="form-control"
                id="validationCustom10"
                value={billing_city || ""}
                placeholder="Sydney"
                onChange={handleChange("billing_city")}
                required
              />
              <div className="invalid-feedback">City is required</div>
            </div>
            <div className="col-md-3">
              <label htmlFor="validationCustom11" className="form-label">
                State *
              </label>
              <select
                className="form-select"
                id="validationCustom11"
                value={billing_state || ""}
                onChange={handleChange("billing_state")}
                required
              >
                <option value="">State</option>
                {states.map((state_name, index) => (
                  <option key={index} value={state_name}>
                    {state_name}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                Please select a valid state.
              </div>
            </div>
            <div className="col-md-3">
              <label htmlFor="validationCustom12" className="form-label">
                Postcode *
              </label>
              <input
                type="text"
                className="form-control"
                id="validationCustom12"
                value={billing_postcode || ""}
                placeholder="2000"
                onChange={handleChange("billing_postcode")}
                required
              />
              <div className="invalid-feedback">Postcode is required</div>
            </div>
          </>
        )}

        <div className="col-12">
          <div className=" d-flex justify-content-end">
            <button className="btn btn-dark" type="submit">
              Proceed to payment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
