import { useState } from "react";
import { Data } from "../../JSON data/data.js";
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
        label: "Leads Generated ",
        data: Data.map((data) => data.leadsGenerated),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "gray",
        borderWidth: 1,
      },
      {
        label: "Active deals ",
        data: Data.map((data) => data.activeDeals),
        backgroundColor: [
          "rgba(75,192,167,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "blue",
        borderWidth: 1,
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
              legend: { position: "bottom" },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Analysis;
