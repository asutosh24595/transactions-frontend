import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TransactionsBarChart({ selectedMonth, stats }) {
  const labels = stats.ranges.map((range) => range.range);
  const counts = stats.ranges.map((range) => range.count);
  const data = {
    labels,
    datasets: [
      {
        label: "Number of items",
        data: counts,
        backgroundColor: "rgba(75, 192, 192, 0.9)",
        borderColor: "rgba(75, 192, 192, 1)",
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
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
      },
    },
  };


  return (
    <div className="mt-20 flex item-center justify-center">
      <div className="w-4/5 flex flex-col items-start mb-20 shadow-lg gap-y-4 bg-sky-300/10 p-8">
        <h1 className="text-4xl font-semibold">
          Bar Chart Stats - {selectedMonth}
        </h1>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
