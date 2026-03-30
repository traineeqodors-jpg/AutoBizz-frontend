import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Data } from "../../JSON data/data.js";
import { Bar} from "react-chartjs-2";

Chart.register(CategoryScale);


function Analysis() {
    const [chartData] = useState({
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
     <div className="relative w-full h-full ">
       <Bar
         data={chartData}
         options={{
           responsive: true,
           maintainAspectRatio: false, // Critical: Allows chart to fill the container height
           plugins: {
             legend: {
               position: "bottom", // Saves horizontal space on mobile
               labels: { boxWidth: 10, font: { size: 11 } },
             },
           },
           scales: {
             x: { grid: { display: false } }, // Cleaner look
             y: { beginAtZero: true },
           },
         }}
       />
     </div>
   );

}

export default Analysis;