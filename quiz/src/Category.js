import React from "react";

function CategorySelector({ categories, selectedCategory, onSelectCategory }) {
  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    onSelectCategory(selectedCategory);
  };

  return (
    <div>
      <label htmlFor="category" className="label">
        Select Category:{" "}
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleChange}
        className="padding"
      >
        <option value=""> --Select Category-- </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategorySelector;
