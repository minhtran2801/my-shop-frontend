import React, { useState } from "react";
import CategoryCheckbox from "./CategoryCheckbox";
import PriceSlider from "./Price";

const ProductFilters = ({ categories, handleFilters }) => {
  const [filterState, setFilterState] = useState({
    filters: { category: [], price: [] },
  });

  const handleFiltersChange = (filters_param, filterBy_param) => {
    const newFilters = { ...filterState };
    newFilters.filters[filterBy_param] = filters_param;
    setFilterState(newFilters);
    handleFilters(newFilters);
  };

  return (
    <div className="accordion border-0 pb-2" id="accordionFilter">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Filter By Categories
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="headingOne"
        >
          <div className="accordion-body">
            <ul className="category-list">
              <CategoryCheckbox
                categories={categories}
                handleFilters={(filters) =>
                  handleFiltersChange(filters, "category")
                }
              />
            </ul>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Filter By Price
          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo"
        >
          <div className="accordion-body">
            <div className="p-2">
              <PriceSlider
                handleFilters={(filters) =>
                  handleFiltersChange(filters, "price")
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
