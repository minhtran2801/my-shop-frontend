import React, { useState, useEffect } from "react";
import HomeLayout from "../Layout/HomeLayout";
import { getSingleProduct, getRelatedProducts } from "../../api/productsAPIs";
import ProductInfo from "./ProductInfo";
import ProductCard from "./ProductCard";
import Loading from "./Loading";

const ProductDetail = (props) => {
  const [productState, setProductState] = useState({});
  const [relatedProductState, setRelatedProductState] = useState({
    relatedProducts: [],
    loadRelated: true,
    cols: 0,
  });

  const { relatedProducts, loadRelated, cols } = relatedProductState;

  const loadRelatedProducts = (productId) => {
    getRelatedProducts(productId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelatedProductState({
          relatedProducts: data,
          loadRelated: false,
          cols: 12 / data.length,
        });
      }
    });
  };

  const loadSingleProduct = (productId) => {
    getSingleProduct(productId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProductState(data);
        document.title = data.name;
        // Fetch related products
        loadRelatedProducts(productId);
      }
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]); // eslint-disable-line react-hooks/exhaustive-deps

  const RelatedProducts = () => (
    <div className="container">
      <div className="row f-flex justify-content-center">
        <div className="col-12 text-center py-5">
          <h2>Related Products</h2>
        </div>
        {relatedProducts.length > 0 ? (
          relatedProducts.map((prod, index) => (
            <ProductCard
              key={index}
              className={`col-md-${cols} pb-3 related-products-col`}
              product={prod}
            />
          ))
        ) : (
          <div className="text-center">
            Sorry, we don't have any related products at this moment
          </div>
        )}
      </div>
    </div>
  );

  return (
    <HomeLayout>
      {productState && productState.name ? (
        <ProductInfo product={productState} />
      ) : (
        <Loading />
      )}
      {loadRelated ? <Loading /> : <RelatedProducts />}
    </HomeLayout>
  );
};

export default ProductDetail;
