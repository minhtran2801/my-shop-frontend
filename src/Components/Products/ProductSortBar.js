import React, { useState } from "react";

const ProductSortBar = ({ itemsQuantity, handleSort }) => {
  const [sortBy, setSort] = useState({
    order: "",
    sortBy: "",
  });

  const handleSorting = (event) => {
    const val = event.target.value;
    const newSort = { ...sortBy };
    switch (val) {
      case "lowest":
        newSort["order"] = "asc";
        newSort["sortBy"] = "price";
        break;
      case "highest":
        newSort["order"] = "desc";
        newSort["sortBy"] = "price";
        break;
      case "newest":
        newSort["order"] = "desc";
        newSort["sortBy"] = "createdAt";
        break;
      default:
        newSort["order"] = "desc";
        newSort["sortBy"] = "soldItems";
    }
    setSort(newSort);
    handleSort(newSort);
  };

  return (
    <div className="row d-flex align-items-center pb-3">
      <div className="product-number col-3">{itemsQuantity} Items</div>
      <div className="col-9 d-flex justify-content-end align-items-center">
        <div className="sort-title">Sort By</div>
        <select
          className="form-select sort-select"
          aria-label="sortBy"
          onChange={handleSorting}
        >
          <option value="">Best Sellers</option>
          <option value="lowest">Lowest Price</option>
          <option value="highest">Highest Price</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
};

export default ProductSortBar;
