import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

const ProductCard = ({ className, product }) => {
  return (
    <div className={className}>
      <Link
        to={`/product/${product._id}`}
        className="text-dark text-decoration-none"
      >
        <div className="bg-light">
          <ShowImage product={product} url="products" />
        </div>
        <div className="pt-2">{product.name}</div>
        <div className="pt-2">$ {product.price.toFixed(2)}</div>
      </Link>
    </div>
  );
};

export default ProductCard;
