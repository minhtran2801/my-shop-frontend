import React, { useState, useEffect } from "react";
import AdminDashboardLayout from "../../Layout/AdminDashboardLayout";
import { isAuthenticated } from "../../../api/customerAPIs";
import { deleteProduct, getProducts } from "../../../api/adminAPIs";
import { API } from "../../../config";
import moment from "moment";
import { Link } from "react-router-dom";
import deleteConfirmationImg from "../../../assets/products/delete.png";

const Products = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    document.title = "Inventory";
    loadProducts();
  }, []);

  const deleteSingleProduct = (productId) => {
    deleteProduct(user._id, token, productId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  return (
    <AdminDashboardLayout>
      <div className="card mb-5 product-card">
        <div className="card-header">
          <h1>Products</h1>
          {products.length > 0 ? (
            <div>
              <p>Total products: {products.length}</p>
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th scope="col">Product ID</th>
                      <th scope="col">Name</th>
                      <th scope="col" className="text-center">
                        Price
                      </th>
                      <th scope="col" className="text-center">
                        Quantity
                      </th>
                      <th scope="col" className="text-center">
                        Sold quantity
                      </th>
                      <th scope="col" className="text-center">
                        Last update
                      </th>
                      <th scope="col" className="text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{product._id}</th>
                          <td>
                            <div>
                              <img
                                src={`${API}/products/photo/${product._id}`}
                                alt={product.name}
                                className="mb-3 product-thumbnail"
                              />
                              <span className="ps-2">{product.name}</span>
                            </div>
                          </td>
                          <td className="text-center">${product.price}</td>
                          <td className="text-center">{product.quantity}</td>
                          <td className="text-center">{product.soldItems}</td>
                          <td className="text-center">
                            {moment(product.updatedAt).fromNow()}
                          </td>
                          <td>
                            <div className="d-flex justify-content-evenly">
                              <Link to={`/admin/product/update/${product._id}`}>
                                <i className="fas fa-edit"></i>
                              </Link>
                              <span
                                className="text-danger"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteModal"
                              >
                                <i className="far fa-trash-alt"></i>
                              </span>
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
                                      <h5
                                        className="modal-title"
                                        id="deleteModalLabel"
                                      >
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
                                          Do you really want to delete{" "}
                                          {product.name}?<br /> This process
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
                                          deleteSingleProduct(product._id);
                                        }}
                                      >
                                        Yes, delete it!
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p>No products</p>
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default Products;
