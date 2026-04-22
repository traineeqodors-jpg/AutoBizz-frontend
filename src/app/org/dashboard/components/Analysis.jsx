"use client";


import { Data } from "../../../../Json data/data.js";

import { useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register only what you use
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function Analysis() {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.month),
    datasets: [
      {
        label: "Leads Generated",
        data: Data.map((data) => data.leadsGenerated),
        backgroundColor: "#3c6ce4",
        barPercentage: 0.9,
        categoryPercentage: 0.7,
        hoverBackgroundColor: "#2a54b8",
        borderRadius: 7,
        borderSkipped: false,
        maxBarThickness: 35,
      },
      {
        label: "Active Deals",
        data: Data.map((data) => data.activeDeals),
        backgroundColor: "rgba(60, 108, 228, 0.2)",
        barPercentage: 0.9,
        categoryPercentage: 0.7,
        borderColor: "#3c6ce4",
        borderWidth: 1,
        borderRadius: 7,
        borderSkipped: false,
        maxBarThickness: 35,
      },
    ],
  });

  return (
    <div className="w-full h-full rounded-2xl p-5 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
          Leads Analysis Graph
        </h3>
      </div>

      <div className="relative flex-1 w-full min-h-0">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  usePointStyle: true, // Makes legend icons circles instead of boxes
                  padding: 20,
                  color: "#64748b", // Slate-500
                  font: { weight: "600" },
                },
              },
              tooltip: {
                backgroundColor: "#1e293b", // Dark slate tooltip
                padding: 12,
                borderRadius: 10,
              },
            },
            scales: {
              x: {
                grid: { display: false }, // Cleaner look
                ticks: { color: "#94a3b8" },
              },
              y: {
                beginAtZero: true,
                grid: { color: "rgba(148, 163, 184, 0.1)" },
                ticks: { color: "#94a3b8" },
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Analysis;
