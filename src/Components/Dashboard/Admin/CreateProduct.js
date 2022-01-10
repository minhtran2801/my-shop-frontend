import React, { useState, useEffect } from "react";
import AdminDashboardLayout from "../../Layout/AdminDashboardLayout";
import { isAuthenticated } from "../../../api/customerAPIs";
import { createProduct, getCategories } from "../../../api/adminAPIs";

import uploadImage from "../../../assets/forms/upload.svg";

const CreateProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    ingredients: [],
    directions: "",
    price: "",
    categories: [],
    category: "",
    quantity: "",
    shipping: "",
    formData: "",
    success: false,
  });

  const [errors, setErrors] = useState({
    name_error: "",
    description_error: "",
    ingredients_error: "",
    directions_error: "",
    price_error: "",
    category_error: "",
    quantity_error: "",
    shipping_error: "",
  });
  const [photoPreview, setPhotoPreview] = useState("");

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    ingredients,
    directions,
    price,
    categories,
    category,
    quantity,
    shipping,
    formData,
    success,
  } = values;

  const {
    name_error,
    description_error,
    ingredients_error,
    directions_error,
    price_error,
    category_error,
    quantity_error,
    shipping_error,
  } = errors;

  // Load categories and set formdata
  useEffect(() => {
    document.title = "Create Product";
    if (categories.length === 0) {
      getCategories().then((data) => {
        if (data.error) {
          setErrors({ ...errors, errors: data.error });
        } else {
          setValues({
            ...values,
            categories: data.data,
            formData: new FormData(),
          });
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = (field) => (event) => {
    const value =
      field === "photo" ? event.target.files[0] : event.target.value;
    formData.set(field, value);
    setValues({ ...values, [field]: value });
    if (event.target.files) {
      setPhotoPreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const clearFields = () => {
    document.getElementById("imgUpload").value = "";
    setPhotoPreview("");
    setValues({
      ...values,
      name: "",
      description: "",
      ingredients: [],
      directions: "",
      price: "",
      category: "",
      quantity: "",
      shipping: "",
      loading: true,
      error: "",
      createdProduct: "",
      redirectToProfile: false,
      formData: new FormData(),
      success: true,
    });
    setErrors({
      ...errors,
      name_error: "",
      description_error: "",
      ingredients_error: "",
      directions_error: "",
      price_error: "",
      category_error: "",
      quantity_error: "",
      shipping_error: "",
    });
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", success: false });
    createProduct(user._id, token, formData).then((data) => {
      if (data.errors) {
        setValues({ ...values, success: false });
        setErrors({
          ...errors,
          name_error: data.name,
          description_error: data.description,
          ingredients_error: data.ingredients,
          directions_error: data.directions,
          price_error: data.price,
          category_error: data.category,
          quantity_error: data.quantity,
          shipping_error: data.shipping,
        });
      } else {
        clearFields();
      }
    });
  };

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New product is added
    </div>
  );

  const infoForm = () => {
    return (
      <div className="pt-4 px-3">
        <div className="card mb-4">
          <div className="card-header bg-white">
            <h4>Product Information</h4>
          </div>
          <div className="card-body">
            <div className="mb-4">
              <label
                htmlFor="productName"
                className={`form-label ${
                  name_error.length > 0 ? "invalidText" : "validText"
                }`}
              >
                Product Name
              </label>
              <input
                type="text"
                className={`form-control  ${
                  name_error.length > 0 ? "invalidBorder" : "validBorder"
                }`}
                placeholder="Product Name"
                value={name}
                onChange={handleChange("name")}
                id="productName"
                autoFocus
              />
              {name_error.length > 0 && (
                <span className="form-text invalidText">
                  <i
                    className="fas fa-exclamation-circle fa-fw"
                    aria-hidden="true"
                  ></i>
                  {name_error}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="productDescription"
                className={`form-label ${
                  description_error.length > 0 ? "invalidText" : "validText"
                }`}
              >
                Product Description
              </label>
              <textarea
                type="text"
                className={`form-control  ${
                  description_error.length > 0 ? "invalidBorder" : "validBorder"
                }`}
                placeholder="Product Description"
                rows="4"
                value={description}
                onChange={handleChange("description")}
                id="productDescription"
              />
              {description_error.length > 0 && (
                <span className="form-text invalidText">
                  <i
                    className="fas fa-exclamation-circle fa-fw"
                    aria-hidden="true"
                  ></i>

                  {description_error}
                </span>
              )}
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className={`form-label ${
                      price_error.length > 0 ? "invalidText" : "validText"
                    }`}
                  >
                    Price
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      min="0.00"
                      max="10000.00"
                      step="0.01"
                      className={`form-control  ${
                        price_error.length > 0 ? "invalidBorder" : "validBorder"
                      }`}
                      placeholder="Price"
                      value={price}
                      onChange={handleChange("price")}
                      id="price"
                    />
                  </div>
                  {price_error.length > 0 && (
                    <span className="form-text invalidText">
                      <i
                        className="fas fa-exclamation-circle fa-fw"
                        aria-hidden="true"
                      ></i>

                      {price_error}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-4">
                  <label
                    htmlFor="quantity"
                    className={`form-label ${
                      quantity_error.length > 0 ? "invalidText" : "validText"
                    }`}
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    className={`form-control  ${
                      quantity_error.length > 0
                        ? "invalidBorder"
                        : "validBorder"
                    }`}
                    placeholder="Quantity"
                    value={quantity}
                    onChange={handleChange("quantity")}
                    id="quantity"
                  />
                  {quantity_error.length > 0 && (
                    <span className="form-text invalidText">
                      <i
                        className="fas fa-exclamation-circle fa-fw"
                        aria-hidden="true"
                      ></i>

                      {quantity_error}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-4">
                  <label
                    htmlFor="shipping"
                    className={`form-label ${
                      shipping_error.length > 0 ? "invalidText" : "validText"
                    }`}
                  >
                    Shipping
                  </label>
                  <select
                    value={shipping}
                    onChange={handleChange("shipping")}
                    className={`form-select  ${
                      shipping_error.length > 0
                        ? "invalidBorder"
                        : "validBorder"
                    }`}
                    aria-label="shipping"
                  >
                    <option value="">Please select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                  {shipping_error.length > 0 && (
                    <span className="form-text invalidText">
                      <i
                        className="fas fa-exclamation-circle fa-fw"
                        aria-hidden="true"
                      ></i>

                      {shipping_error}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header bg-white">
            <h4>Ingredients And Directions</h4>
          </div>
          <div className="card-body">
            <div className="mb-4">
              <label
                htmlFor="ingredients"
                className={`form-label ${
                  ingredients_error.length > 0 ? "invalidText" : "validText"
                }`}
              >
                Ingredients
              </label>
              <textarea
                type="text"
                className={`form-control  ${
                  ingredients_error.length > 0 ? "invalidBorder" : "validBorder"
                }`}
                placeholder={`Seperate ingredients by new line if necessary.\nE.g\nIngredient 1\nIngredient 2`}
                rows="4"
                value={ingredients}
                onChange={handleChange("ingredients")}
                id="ingredients"
              />
              {ingredients_error.length > 0 && (
                <span className="form-text invalidText">
                  <i
                    className="fas fa-exclamation-circle fa-fw"
                    aria-hidden="true"
                  ></i>

                  {ingredients_error}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="directions"
                className={`form-label ${
                  directions_error.length > 0 ? "invalidText" : "validText"
                }`}
              >
                Directions
              </label>
              <textarea
                type="text"
                className={`form-control  ${
                  directions_error.length > 0 ? "invalidBorder" : "validBorder"
                }`}
                placeholder="Directions to use"
                rows="4"
                value={directions}
                onChange={handleChange("directions")}
                id="directions"
              />
              {directions_error.length > 0 && (
                <span className="form-text invalidText">
                  <i
                    className="fas fa-exclamation-circle fa-fw"
                    aria-hidden="true"
                  ></i>

                  {directions_error}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const imageAndCategoryForm = () => {
    return (
      <div className="pt-4">
        <div className="card mb-4">
          <div className="card-header bg-white">
            <h4>Image</h4>
          </div>
          <div className="card-body">
            <div className="image-upload text-center">
              <img
                src={photoPreview !== "" ? photoPreview : uploadImage}
                alt="Product"
              />
              <input
                className="form-control"
                type="file"
                onChange={handleChange("photo")}
                accept="image/png, image/jpeg"
                id="imgUpload"
              />
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-header bg-white">
            <h4>Categories</h4>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label
                htmlFor="category"
                className={`form-label ${
                  category_error.length > 0 ? "invalidText" : "validText"
                }`}
              >
                Category
              </label>
              <select
                value={category}
                onChange={handleChange("category")}
                className={`form-select  ${
                  category_error.length > 0 ? "invalidBorder" : "validBorder"
                }`}
                id="category"
              >
                <option value="">Please select</option>
                {categories &&
                  categories.map((cat, index) => (
                    <option key={index} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
              {category_error.length > 0 && (
                <span className="form-text invalidText">
                  <i
                    className="fas fa-exclamation-circle fa-fw"
                    aria-hidden="true"
                  ></i>

                  {category_error}
                </span>
              )}
            </div>
          </div>
        </div>
        <div>
          {showSuccess()}
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
    );
  };

  const formLayout = () => {
    return (
      <form onSubmit={onSubmitForm}>
        <div className="row">
          <div className="col-9">
            <div className="content-header pt-4 px-3">
              <h1 className="content-title">
                <span>Create New Product</span>
              </h1>
            </div>
          </div>
          <div className="col-lg-6">{infoForm()}</div>
          <div className="col-lg-3">{imageAndCategoryForm()}</div>
        </div>
      </form>
    );
  };

  return <AdminDashboardLayout>{formLayout()}</AdminDashboardLayout>;
};

export default CreateProduct;
