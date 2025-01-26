// components/SpendingPieChart.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SpendingPieChart = () => {
  const data = {
    labels: ["Food", "Transport", "Utilities", "Entertainment", "Other"],
    datasets: [
      {
        data: [500, 200, 150, 100, 50],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Food
          "rgba(54, 162, 235, 0.6)", // Transport
          "rgba(255, 206, 86, 0.6)", // Utilities
          "rgba(75, 192, 192, 0.6)", // Entertainment
          "rgba(153, 102, 255, 0.6)", // Other
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Spending by Category" },
    },
  };

  return <Pie data={data} options={options} />;
};

export default SpendingPieChart;
