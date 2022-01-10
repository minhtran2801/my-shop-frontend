import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import HomeLayout from "../Layout/HomeLayout";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductSidebar/ProductFilters";

import { getCategories } from "../../api/adminAPIs";
import { getFilteredProducts } from "../../api/productsAPIs";

import ProductNotFound from "../../assets/products/no-product.png";
import ProductSortBar from "./ProductSortBar";

const ProductList = () => {
  const [categories, setCategories] = useState([]);
  const [filterState, setFilterState] = useState({
    filters: { category: [], price: [] },
  });
  const [sortByState, setSortByState] = useState({
    order: "desc",
    sortBy: "soldItems",
  });
  const [pageState, setPageState] = useState({
    productList: [],
    perPage: 9,
    page: 0,
    pages: 0,
    loading: true,
  });

  const { productList, perPage, page, pages, loading } = pageState;
  const { filters } = filterState;

  const loadFilteredProducts = (newFilters, newSort) => {
    getFilteredProducts(newFilters.filters, newSort).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPageState({
          ...pageState,
          productList: data.products,
          page: 0,
          pages: Math.ceil(data.products.length / perPage),
          loading: false,
        });
      }
    });
  };

  const loadCategories = () => {
    if (categories.length === 0) {
      getCategories().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCategories(data.data);
        }
      });
    }
  };

  // Load categories and products when component mounts
  useEffect(() => {
    loadCategories();
    loadFilteredProducts(filters);
    document.title = "Shop";
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll to top when change page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pageState]);

  const handleFilters = (filters_param) => {
    setFilterState(filters_param);
    loadFilteredProducts(filters_param, sortByState);
  };

  const handleSort = (sort_param) => {
    setSortByState(sort_param);
    loadFilteredProducts(filterState, sort_param);
  };

  const handlePageClick = (event) => {
    let page = event.selected;
    setPageState({ ...pageState, page: page });
  };

  const Products = () => (
    <div className="row">
      <div className="col-md-4 col-lg-3">
        <ProductFilters
          categories={categories}
          handleFilters={(f) => handleFilters(f)}
        />
      </div>
      <div className="col-md-8 col-lg-9">
        {productList.length > 0 ? (
          <div>
            <ProductSortBar
              itemsQuantity={productList.length}
              handleSort={(s) => handleSort(s)}
            />
            <div className="row">
              {productList
                .slice(page * perPage, (page + 1) * perPage)
                .map((product, i) => (
                  <ProductCard
                    key={i}
                    className="col-md-4 pb-5"
                    product={product}
                  />
                ))}
            </div>
            <div className="d-flex justify-content-center">
              <ReactPaginate
                previousLabel={<i className="fas fa-chevron-left"></i>}
                nextLabel={<i className="fas fa-chevron-right"></i>}
                pageCount={pages}
                forcePage={page}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center bg-light h-100">
            <img src={ProductNotFound} alt="Not found product" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <HomeLayout>
      <div className="container" id="productsList">
        <div className="py-5 text-center">
          <h2>SHOP</h2>
        </div>
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <Products />
        )}
      </div>
    </HomeLayout>
  );
};

export default ProductList;
