import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetGauge = ({ budget, spent }) => {
  const percentageSpent = (spent / budget) * 100;
  const isOverBudget = percentageSpent > 100;
  const gaugeMax = Math.max(percentageSpent, 100); // Expands if overspent

  const data = {
    labels: ["Spent", "Remaining"],
    datasets: [
      {
        data: [
          Math.min(percentageSpent, 100),
          100 - Math.min(percentageSpent, 100),
        ],
        backgroundColor: isOverBudget
          ? ["#FF3B3B", "#E0E0E0"]
          : ["#4CAF50", "#E0E0E0"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    circumference: 180,
    rotation: 270,
    cutout: "80%",
    plugins: { tooltip: { enabled: false } },
  };

  return (
    <div className="pie guage">
      <h5>Budget Overview</h5>
      <p>Overview of how much of your budget has been spent</p>
      <Doughnut data={data} options={options} />
      <h4
        style={{
          width: "100%",
          textAlign: "center",
          transform: "translateY(-100%)",
          marginTop: "-20%",
          color: isOverBudget ? "red" : "black",
        }}
      >
        {isOverBudget
          ? `Overspent by $${(spent - budget).toLocaleString()}`
          : `${percentageSpent.toFixed(1)}% Spent`}
      </h4>
    </div>
  );
};

export default BudgetGauge;
