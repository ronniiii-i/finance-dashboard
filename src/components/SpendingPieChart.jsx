import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const SpendingCategoryPieChart = ({ transactions, categories, timeRangeOptions }) => {
  const [timeRange, setTimeRange] = useState("7days"); // Default time range
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [data, setData] = useState([]);

  // Time range options
  // const timeRangeOptions = [
  //   { value: "7days", label: "Last 7 Days" },
  //   { value: "14days", label: "Last 2 Weeks" },
  //   { value: "1month", label: "Last Month" },
  //   { value: "3months", label: "Last 3 Months" },
  //   { value: "6months", label: "Last 6 Months" },
  //   { value: "1year", label: "Last 1 Year" },
  //   { value: "alltime", label: "All Time" },
  //   { value: "custom", label: "Custom Date Range" },
  // ];

  // Function to filter transactions based on the selected time range
  const filterTransactionsByTimeRange = (transactions, range) => {
    const now = new Date();
    let startDate;

    switch (range) {
      case "7days":
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case "14days":
        startDate = new Date(now.setDate(now.getDate() - 14));
        break;
      case "1month":
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "3months":
        startDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case "6months":
        startDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case "1year":
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      case "alltime":
        startDate = new Date(0); // Start from the earliest possible date
        break;
      case "custom":
        if (customStartDate && customEndDate) {
          startDate = new Date(customStartDate);
          const endDate = new Date(customEndDate);
          return transactions.filter(
            (transaction) =>
              new Date(transaction.date) >= startDate &&
              new Date(transaction.date) <= endDate
          );
        } else {
          return transactions; // If custom dates are not set, return all transactions
        }
      default:
        startDate = new Date(now.setDate(now.getDate() - 7)); // Default to last 7 days
    }

    return transactions.filter(
      (transaction) => new Date(transaction.date) >= startDate
    );
  };

  // Function to calculate total expenses by category
  const calculateExpensesByCategory = (transactions, categories) => {
    const expenses = {};

    // Initialize expenses object with category names and amounts
    categories.forEach((category) => {
      if (category.type === "expense") {
        expenses[category.name] = 0;
      }
    });

    // Sum up amounts for each category
    transactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        const category = categories.find((cat) => cat.name === transaction.category);
        if (category) {
          expenses[category.name] += transaction.amount;
        }
      }
    });

    // Format data for the pie chart
    return Object.keys(expenses).map((name) => ({
      name,
      value: expenses[name],
      color: categories.find((cat) => cat.name === name)?.color || "#000",
    }));
  };

  // Update data when time range or custom dates change
  useEffect(() => {
    const filteredTransactions = filterTransactionsByTimeRange(transactions, timeRange);

    const chartData = calculateExpensesByCategory(filteredTransactions, categories);

    setData(chartData);
  }, [timeRange, transactions, categories, customStartDate, customEndDate]);

  return (
    <div className="pie">
      <h5>Spending by Category</h5>
      <p>Overview of your total spending</p>
      {timeRange === "custom" && (
        <div style={{ marginTop: "10px" }}>
          <input
            type="date"
            value={customStartDate}
            onChange={(e) => setCustomStartDate(e.target.value)}
            style={{ marginRight: "10px", padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <input
            type="date"
            value={customEndDate}
            onChange={(e) => setCustomEndDate(e.target.value)}
            style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
      )}
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            nameKey="name"
            // label
            style={{"maxWidth": "100px", "padding":"1rem"}}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="filter-container">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="filter-select"
        >
          {timeRangeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SpendingCategoryPieChart;