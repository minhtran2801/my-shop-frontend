import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AdminDashboardLayout from "../../Layout/AdminDashboardLayout";
import { isAuthenticated } from "../../../api/customerAPIs";
import { deleteProduct } from "../../../api/adminAPIs";
import deleteConfirmationImg from "../../../assets/products/delete.png";
import { API } from "../../../config";
import {
  getCategories,
  getSingleProduct,
  updateProduct,
} from "../../../api/adminAPIs";

const UpdateProduct = (props) => {
  const history = useHistory();
  const [values, setValues] = useState({
    name: "",
    description: "",
    ingredients: [],
    directions: "",
    price: "",
    category: "",
    quantity: "",
    shipping: "",
  });

  const [categoriesState, setCategoriesState] = useState({
    categories: [],
    formData: "",
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
    category,
    quantity,
    shipping,
  } = values;

  const { categories, formData } = categoriesState;

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

  const loadCategories = () => {
    if (categories.length === 0) {
      getCategories().then((data) => {
        if (data.error) {
          setErrors({ ...errors, errors: data.error });
        } else {
          setCategoriesState({
            categories: data.data,
            formData: new FormData(),
          });
        }
      });
    }
  };

  const init = () => {
    getSingleProduct(props.match.params.productId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadCategories();
        document.title = data.name;
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          ingredients: data.ingredients,
          directions: data.directions,
          price: data.price,
          category: data.category,
          quantity: data.quantity,
          shipping: data.shipping ? 1 : 0,
        });
      }
    });
  };

  // Load categories and set formdata
  useEffect(() => {
    init();
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

  const deleteSingleProduct = (productId) => {
    deleteProduct(user._id, token, productId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        history.push({
          pathname: "/admin/products",
        });
      }
    });
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", success: false });
    updateProduct(user._id, token, props.match.params.productId, formData).then(
      (data) => {
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
          history.push({
            pathname: "/admin/products",
          });
        }
      }
    );
  };

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
                value={name || ""}
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
                value={description || ""}
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
                      value={price || ""}
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
                    value={quantity || ""}
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
                    value={shipping || ""}
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
                value={ingredients || ""}
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
                value={directions || ""}
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
                src={
                  photoPreview !== ""
                    ? photoPreview
                    : `${API}/products/photo/${props.match.params.productId}`
                }
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
          <button
            type="submit"
            className="btn btn-success btn-md rounded font-sm hover-up w-100"
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-danger rounded font-sm mt-3 hover-up w-100"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
          >
            Delete
          </button>
          <div
            className="modal fade"
            id="deleteModal"
            tabIndex="-1"
            aria-labelledby="deleteModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteModalLabel">
                    Delete confirmation
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div>
                    <img
                      src={deleteConfirmationImg}
                      alt="confirm"
                      className="delete-confirm"
                    />
                  </div>
                  <div className="delete-text">
                    <h3 className="pt-2">Are you sure?</h3>
                    <p className="pt-2">
                      Do you really want to delete {name}?<br /> This process
                      cannot be undone.
                    </p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    No, cancel it!
                  </button>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-danger"
                    onClick={(event) => {
                      deleteSingleProduct(props.match.params.productId);
                    }}
                  >
                    Yes, delete it!
                  </button>
                </div>
              </div>
            </div>
          </div>
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
                <span>Update product</span>
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

export default UpdateProduct;
