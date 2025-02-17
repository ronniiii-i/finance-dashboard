import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const BudgetBreakdown = ({ categories, categoryData }) => {
  // const labels = categories.map((cat) => cat.name);
  // const budgetValues = categories.map((cat) => cat.budget);
  // const spentValues = categories.map((cat) => cat.spent);
  const labels = categoryData.map((cat) => cat.name);
  const budgetValues = categoryData.map((cat) => cat.budget);
  const spentValues = categoryData.map((cat) => cat.amount);

  const data = {
    labels,
    datasets: [
      {
        label: "Planned",
        data: budgetValues,
        backgroundColor: "rgba(54, 162, 235, 0.7)", // Blue
      },
      {
        label: "Actual Spending",
        data: spentValues,
        backgroundColor: "rgba(255, 99, 132, 0.7)", // Red
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom height to work
    plugins: { legend: { position: "top" } },
    // layout: {
    //   padding: {
    //     top: 50, // Adds space between legend and graph
    //   },
    // },
    scales: {
      x: {
        grid: { drawOnChartArea: false }, // Removes vertical gridlines
        ticks: { maxRotation: 0, minRotation: 0 }, // Ensures labels are parallel
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="pie breakdown">
      {" "}
      {/* Adjust height as needed */}
      <h5>Budget Breakdown</h5>
      <p>Comparison of budget against actual spent</p>
      <div style={{ height: "100%" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BudgetBreakdown;
