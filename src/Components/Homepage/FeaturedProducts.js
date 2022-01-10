import React, { useState, useEffect } from "react";
import { getProducts } from "../../api/productsAPIs";
import ProductCard from "../Products/ProductCard";

const FeaturedProducts = () => {
  const [productBySell, setProductBySell] = useState([]);
  const [productByArrival, setProductByArrival] = useState([]);

  const loadProductBySell = () => {
    getProducts("soldItems").then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProductBySell(data);
      }
    });
  };

  const loadProductByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProductByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductBySell();
    loadProductByArrival();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 py-5 text-center">
          <h2>BEST SELLERS</h2>
        </div>
        {productBySell.map((prod, index) => (
          <ProductCard key={index} className="col-md-4 pb-3" product={prod} />
        ))}
      </div>
      <div className="col-md-6 offset-md-3 py-4">
        <hr />
      </div>
      <div className="row">
        <div className="col-12 pb-5 text-center">
          <h2>NEW ARRIVALS</h2>
        </div>
        {productByArrival.map((prod, index) => (
          <ProductCard key={index} className="col-md-4 pb-3" product={prod} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
