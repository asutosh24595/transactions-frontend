import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TransactionsPieChart({ stats, selectedMonth }) {
  const chartData = {
    labels: stats.ranges.map((item) => item.category), 
    datasets: [
      {
        data: stats.ranges.map((item) => item.count), 
        backgroundColor: ["#48cae4","#0077b6","#03045e","#0096c7"], 
        borderColor: ["#48cae4","#0077b6","#03045e","#0096c7"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.label || "";
            if (context.parsed !== null) {
              label += `: ${context.parsed.toFixed(2)}`;
            }
            return label;
          },
        },
      },
    },
  };

  return(
  <div className="mt-20 flex item-center justify-center">
    <div className="w-1/2 flex flex-col items-start mb-20 shadow-lg gap-y-4 bg-sky-300/10 p-8">
      <h1 className="text-4xl font-semibold">
        Pie Chart Stats - {selectedMonth}
      </h1>
      <Pie data={chartData} options={options}/>
    </div>
  </div>
  );
}
