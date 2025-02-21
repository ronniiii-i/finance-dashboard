/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { FaSortDown } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import the default styles
import "../styles/filter.scss";

const Filter = ({ show, onClose }) => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    type: "",
    selectedCategories: [],
    minAmount: 50, // Default min amount
    maxAmount: 1000, // Default max amount
  });

  const [dropdownVisibility, setDropdownVisibility] = useState({
    date: false,
    time: false,
    type: false,
    category: false,
    amount: false,
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

  const handleSliderChange = (value) => {
    setFilters({
      ...filters,
      minAmount: value[0],
      maxAmount: value[1],
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

  const toggleDropdown = (section) => {
    setDropdownVisibility((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className={`filter-sidebar flex ${show ? "active" : "hidden"}`}>
      <div className="flex align-center justify-between">
        <h3 className="flex align-center">
          <IoFilterOutline />
          Filter
        </h3>
        <MdClose onClick={() => onClose()} />
      </div>

      <div className="filter-content">
        <div className="filter-section">
          <div
            className="title flex justify-between"
            onClick={() => toggleDropdown("date")}
          >
            <h6 className="flex align-center">Date</h6>
            <FaSortDown className={dropdownVisibility.date ? "rotate" : ""} />
          </div>
          <div
            className={`filter-dropdown ${
              dropdownVisibility.date ? "open" : ""
            }`}
          >
            <div className="dropdown-item flex align-center justify-between">
              <label>Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="dropdown-item flex align-center justify-between">
              <label>End Date:</label>
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="filter-section">
          <div
            className="title flex justify-between"
            onClick={() => toggleDropdown("time")}
          >
            <h6 className="flex align-center">Time</h6>
            <FaSortDown className={dropdownVisibility.time ? "rotate" : ""} />
          </div>
          <div
            className={`filter-dropdown ${
              dropdownVisibility.time ? "open" : ""
            }`}
          >
            <div className="dropdown-item flex align-center justify-between">
              <label>Start Time:</label>
              <input
                type="time"
                name="startTime"
                value={filters.startTime}
                onChange={handleChange}
              />
            </div>
            <div className="dropdown-item flex align-center justify-between">
              <label>End Time:</label>
              <input
                type="time"
                name="endTime"
                value={filters.endTime}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="filter-section">
          <div
            className="title flex justify-between"
            onClick={() => toggleDropdown("type")}
          >
            <h6>Type</h6>
            <FaSortDown className={dropdownVisibility.type ? "rotate" : ""} />
          </div>
          <div
            className={`filter-dropdown ${
              dropdownVisibility.type ? "open" : ""
            }`}
          >
            {types.map((type) => (
              <div className="dropdown-item flex align-center" key={type}>
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
        </div>

        <div className="filter-section">
          <div
            className="title flex justify-between"
            onClick={() => toggleDropdown("category")}
          >
            <h6>Category</h6>
            <FaSortDown
              className={dropdownVisibility.category ? "rotate" : ""}
            />
          </div>
          <div
            className={`filter-dropdown ${
              dropdownVisibility.category ? "open" : ""
            }`}
          >
            {categories.map((category) => (
              <div className="dropdown-item flex align-center" key={category}>
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
        </div>

        <div className="filter-section">
          <div
            className="title flex justify-between"
            onClick={() => toggleDropdown("amount")}
          >
            <h6>Amount</h6>
            <FaSortDown className={dropdownVisibility.amount ? "rotate" : ""} />
          </div>
          <div
            className={`filter-dropdown ${
              dropdownVisibility.amount ? "open" : ""
            }`}
          >
            <div className="dropdown-item">
              <Slider
                range
                min={minTransactionAmount}
                max={maxTransactionAmount}
                value={[filters.minAmount, filters.maxAmount]}
                onChange={handleSliderChange}
              />
              <div className="flex justify-between">
                <input
                  type="number"
                  name="minAmount"
                  value={filters.minAmount}
                  onChange={handleChange}
                  min={minTransactionAmount}
                  max={maxTransactionAmount}
                />
                <input
                  type="number"
                  name="maxAmount"
                  value={filters.maxAmount}
                  onChange={handleChange}
                  min={minTransactionAmount}
                  max={maxTransactionAmount}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        className="reset-btn"
        onClick={() =>
          setFilters({
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
            type: "",
            selectedCategories: [],
            minAmount: 50, // Default min amount
            maxAmount: 1000, // Default max amount
          })
        }
      >
        Reset
      </button>
    </div>
  );
};

export default Filter;
