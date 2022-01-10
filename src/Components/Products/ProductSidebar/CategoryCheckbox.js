import React, { useState } from "react";

const CategoryCheckbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleCheck = (category) => () => {
    const currentCategoryId = checked.indexOf(category);
    const newCheckCategoryId = [...checked];

    // If not exist, add category to state list
    // Else, delete it from the list
    if (currentCategoryId === -1) {
      newCheckCategoryId.push(category);
    } else {
      newCheckCategoryId.splice(currentCategoryId, 1);
    }
    setChecked(newCheckCategoryId);
    handleFilters(newCheckCategoryId);
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    const emptyFilters = [];
    setChecked(emptyFilters);
    handleFilters(emptyFilters);
  };

  return (
    <>
      {categories.map((category, i) => (
        <li key={i} className="category-li list-unstyled">
          <input
            type="checkbox"
            className="form-check-input"
            value={checked.indexOf(category._id) !== -1}
            checked={checked.indexOf(category._id) !== -1}
            onChange={handleCheck(category._id)}
            id={category.name}
          />
          <label className="form-check-label ps-2" htmlFor={category.name}>
            {category.name}
          </label>
        </li>
      ))}
      <li className="clear-li list-unstyled" onClick={handleOnClick}>
        <span className="clear-span">Clear All</span>
      </li>
    </>
  );
};

export default CategoryCheckbox;
