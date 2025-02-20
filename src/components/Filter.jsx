import React, { useState } from "react";

const Filter = () => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    type: "",
    selectedCategories: [],
    budget: "",
    minAmount: "",
    maxAmount: "",
  });

  const minTransactionAmount = 50;
  const maxTransactionAmount = 1000;

  const types = ["Income", "Expense", "Investment"];
  const categories = ["Food", "Travel", "Shopping", "Health", "Education"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prevState) => {
      const selectedCategories = checked
        ? [...prevState.selectedCategories, value]
        : prevState.selectedCategories.filter((category) => category !== value);
      return { ...prevState, selectedCategories };
    });
  };

  return (
    <div className="filter-sidebar">
      <h2>Filter Options</h2>

      <div className="filter-section">
        <h3>Date</h3>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="filter-section">
        <h3>Time</h3>
        <div>
          <label>Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={filters.startTime}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="time"
            name="endTime"
            value={filters.endTime}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="filter-section">
        <h3>Type</h3>
        {types.map((type) => (
          <div key={type}>
            <input
              type="radio"
              name="type"
              value={type}
              checked={filters.type === type}
              onChange={handleChange}
            />
            <label>{type}</label>
          </div>
        ))}
      </div>

      <div className="filter-section">
        <h3>Category</h3>
        {categories.map((category) => (
          <div key={category}>
            <input
              type="checkbox"
              name="category"
              value={category}
              checked={filters.selectedCategories.includes(category)}
              onChange={handleCategoryChange}
            />
            <label>{category}</label>
          </div>
        ))}
      </div>

      <div className="filter-section">
        <h3>Budget</h3>
        <div>
          <label>Budget:</label>
          <input
            type="number"
            name="budget"
            value={filters.budget}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="filter-section">
        <h3>Amount</h3>
        <div>
          <label>Min Amount:</label>
          <input
            type="range"
            name="minAmount"
            min={minTransactionAmount}
            max={maxTransactionAmount}
            value={filters.minAmount}
            onChange={handleChange}
          />
          <input
            type="number"
            name="minAmount"
            value={filters.minAmount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Max Amount:</label>
          <input
            type="range"
            name="maxAmount"
            min={minTransactionAmount}
            max={maxTransactionAmount}
            value={filters.maxAmount}
            onChange={handleChange}
          />
          <input
            type="number"
            name="maxAmount"
            value={filters.maxAmount}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
