import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import { signOutUser, isAuthenticated } from "../../api/customerAPIs";
import { searchProducts, getAllProducts } from "../../api/productsAPIs";

import logo from "../../assets/logo/logo.png";
import OffCanvasCart from "../Cart/OffCanvasCart";

// Check current page
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#FFFFFF",
    };
  } else {
    return {
      color: "#B0AEAE",
    };
  }
};

const Navbar = ({ history }) => {
  const { user } = isAuthenticated();
  const [isShown, setIsShown] = useState(false);
  const [productNameList, setProductNameList] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    query: "",
    results: [],
    finishSearch: false,
  });

  const { query, results, finishSearch } = searchQuery;

  const performSearch = () => {
    if (query) {
      searchProducts(query).then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          setSearchQuery({ ...searchQuery, results: res, finishSearch: true });
        }
      });
    }
  };

  useEffect(() => {
    // Load product names when first load
    getAllProducts().then((products) => {
      if (products.error) {
        console.log(products.error);
      } else {
        let nameList = [];
        products.map((product) => nameList.push(product.name));
        setProductNameList(nameList);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSearchSubmit = (event) => {
    event.preventDefault();
    performSearch();
  };

  const handleCart = () => {
    setIsShown(!isShown);
  };

  const handleSearch = (event) => {
    setSearchQuery({
      ...searchQuery,
      query: event.target.value,
      finishSearch: false,
    });
  };

  const redirectProducts = () => {
    if (finishSearch) {
      return (
        <Redirect
          to={{
            pathname: "/searchResults",
            state: {
              productList: results,
              searchQuery: query,
            },
          }}
        />
      );
    }
  };

  return (
    <div className="sticky-top ">
      <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
        <div className="container nav-container">
          <a className="navbar-brand" href="/">
            <img
              src={logo}
              alt="shop logo"
              className="d-inline-block align-center"
            />
          </a>

          <div className="nav-searchBar">
            <form className="form-inline" onSubmit={onSearchSubmit}>
              <div className="input-group mr-sm-2">
                <input
                  className="form-control mr-sm-2"
                  type="seach"
                  list={
                    query !== "" && query.length > 3 ? "search-datalist" : ""
                  }
                  placeholder="Search..."
                  aria-label="Search"
                  value={query}
                  onChange={handleSearch}
                />
                <datalist id="search-datalist">
                  {productNameList.map((name, i) => (
                    <option key={i}>{name}</option>
                  ))}
                </datalist>
                <span className="input-group-text border-0" id="search-icon">
                  <button type="submit" className="btn btn-light border-0 p-0">
                    <i className="fa fa-search icon"></i>
                  </button>
                </span>
              </div>
            </form>
          </div>

          <button
            className="navbar-toggler me-xl-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseNavBar"
            aria-controls="collapseNavBar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="collapseNavBar">
            <ul className="navbar-nav flex-row flex-wrap ms-lg-auto text-center justify-content-center align-items-center">
              <li className="nav-item col-5 col-md-auto active">
                <Link
                  className="nav-link p-2"
                  style={isActive(history, "/")}
                  to="/"
                >
                  Home<span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item col-5 col-md-auto ">
                <Link
                  className="nav-link p-2"
                  style={isActive(history, "/products")}
                  to="/products"
                >
                  Shop
                </Link>
              </li>
              {!isAuthenticated() && (
                <li className="nav-item col-5 col-md-auto">
                  <Link className="nav-link p-2" to="/signin">
                    <i
                      className="fas fa-user nav-icons me-2"
                      style={isActive(history, "/signin")}
                    ></i>
                    Login
                  </Link>
                </li>
              )}
              {isAuthenticated() && (
                <li className="nav-item col-5 col-md-auto dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    id="userProfileDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-user nav-icons me-2"></i>
                    Hi {user.f_name}
                  </span>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link
                        className="dropdown-item text-dark"
                        to={
                          isAuthenticated().user.role === 1
                            ? "/admin/account"
                            : "/customer/account"
                        }
                      >
                        <i className="fas fa-user-circle me-2"></i>My Account
                      </Link>
                    </li>
                    <li>
                      <span
                        className="dropdown-item"
                        onClick={() =>
                          signOutUser(() => {
                            history.push("/");
                          })
                        }
                      >
                        <i className="fas fa-sign-out-alt me-2"></i>Log Out
                      </span>
                    </li>
                  </ul>
                </li>
              )}
              <li className="nav-item col-5 col-md-auto">
                <Link
                  className="nav-link p-2"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasCart"
                  aria-controls="offcanvasCart"
                  onClick={handleCart}
                  to=""
                >
                  <div>
                    <i className="fas fa-shopping-bag nav-icons me-2"></i>
                    My Cart
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {redirectProducts()}
      </nav>
      <OffCanvasCart isShown={isShown} />
    </div>
  );
};

export default withRouter(Navbar);
