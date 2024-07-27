// App.js
import Transactions from "./components/Transactions";
import TransactionsStatistics from "./components/TransactionsStatistics";
import { useState, useEffect } from "react";
import { getStatsByMonth } from "./api/api";
import TransactionsBarChart from "./components/TransactionsBarChart";
import TransactionsPieChart from "./components/TransactionsPieChart";

function App() {
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [stats, setStats] = useState(null);
  const [barChart, setBarChart] = useState(null);
  const [pieChart, setPieChart] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStatsByMonth(selectedMonth);
        const { statistics, barChart, pieChart } = data;
        setStats(statistics);
        setBarChart(barChart);
        setPieChart(pieChart);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [selectedMonth]);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  return (
    <div className="w-full min-h-screen p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Transactions Dashboard
        </h1>
      </header>
      <Transactions
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
      />
      {error ? (
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded">
          <p>{error}</p>
        </div>
      ) : (
        <>
          {stats ? (
            <TransactionsStatistics
              selectedMonth={selectedMonth}
              stats={stats}
            />
          ) : (
            <p className="text-center">Loading...</p>
          )}

          {barChart ? (
            <TransactionsBarChart
              selectedMonth={selectedMonth}
              stats={barChart}
            />
          ) : (
            <p className="text-center">Loading...</p>
          )}

          {pieChart ? (
            <TransactionsPieChart
              selectedMonth={selectedMonth}
              stats={pieChart}
            />
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
