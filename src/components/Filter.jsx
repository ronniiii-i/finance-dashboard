/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../styles/filter.scss";

const Filter = ({ show, onClose }) => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    type: "",
    selectedCategories: [],
    minAmount: 50,
    maxAmount: 1000,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;

    setFilters((prevFilters) => {
      let updatedCategories;
      if (checked) {
        updatedCategories = [...prevFilters.selectedCategories, value];
      } else {
        updatedCategories = prevFilters.selectedCategories.filter(
          (category) => category !== value
        );
      }

      return {
        ...prevFilters,
        selectedCategories: updatedCategories,
      };
    });
  };

  const handleReset = () => {
    setFilters({
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      type: "",
      selectedCategories: [],
      minAmount: 50,
      maxAmount: 1000,
    });
  };

  const handleApply = () => {
    // TO DO: implement the logic to apply the filters
    console.log("Applied Filters:", filters);
    onClose();
  };

  const minTransactionAmount = 50;
  const maxTransactionAmount = 1000;

  const types = ["Income", "Expense", "Investment"];
  const categories = ["Food", "Travel", "Shopping", "Health", "Education"];

  

  const handleSliderChange = (value) => {
    setFilters({
      ...filters,
      minAmount: value[0],
      maxAmount: value[1],
    });
  };

  return (
    <div className={`filter-container ${show ? "active" : "hide"}`}>
      {/* Header with close button */}
      <div className="filter-header">
        <h3>Filters</h3>
        <span className="close-btn" onClick={onClose}>
          <FaTimes />
        </span>
      </div>

      {/* Filter sections */}
      <div className="filter-sections">
        {/* Date and Time Filter */}
        <div className="filter-section">
          <label>Date & Time</label>
          <div className="date-time-filters">
            <input type="date" name="startDate" onChange={handleChange} />
            <input type="date" name="endDate" onChange={handleChange} />
            <input type="time" name="startTime" onChange={handleChange} />
            <input type="time" name="endTime" onChange={handleChange} />
          </div>
        </div>

        {/* Type Filter */}
        <div className="filter-section">
          <label>Type</label>
          <select name="type" value={filters.type} onChange={handleChange}>
            <option value="">All</option>
            {types.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter (Checklist) */}
        <div className="filter-section">
          <label>Category</label>
          <div className="category-checklist">
            {categories.map((category) => (
              <label key={category} className="checkbox-label">
                <input
                  type="checkbox"
                  name="selectedCategories"
                  value={category}
                  checked={filters.selectedCategories.includes(category)}
                  onChange={handleCategoryChange}
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Amount Filter */}
        <div className="filter-section">
          <label>Amount Range</label>
          <div className="amount-range">
            <Slider
              range
              min={minTransactionAmount}
              max={maxTransactionAmount}
              value={[filters.minAmount, filters.maxAmount]}
              onChange={handleSliderChange}
            />
            <div className="amount-inputs">
              <input
                type="number"
                name="minAmount"
                value={filters.minAmount}
                onChange={handleChange}
                min={minTransactionAmount}
                max={maxTransactionAmount}
                placeholder="Min"
              />
              <input
                type="number"
                name="maxAmount"
                value={filters.maxAmount}
                onChange={handleChange}
                min={minTransactionAmount}
                max={maxTransactionAmount}
                placeholder="Max"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reset and Apply Buttons */}
      <div className="filter-actions">
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
        <button className="apply-btn" onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>  
  );
};

export default Filter;
