import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Data } from "../../JSON data/data.js";
import { Bar, Pie } from "react-chartjs-2";

Chart.register(CategoryScale);


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
      <div className="chart-container h-[40vh]">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Leads Generation",
              },
              legend: {
                display: true,
              },
            },
          }}
        />
      </div>
    );
}

export default Analysis;