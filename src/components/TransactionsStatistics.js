export default function TransactionsStatistics({ selectedMonth, stats }) {
  return (
    <div className="mt-20 flex items-center justify-center">
      <div className="w-1/2 flex flex-col items-start text-left justify-center border border-gray-300 shadow-lg rounded-md p-6 m-20 gap-y-6 bg-sky-300/10">
        <h1 className="text-4xl font-semibold">
          Statistics - <span>{selectedMonth}</span>
        </h1>
        <div className="flex flex-col gap-y-2 text-2xl">
          {stats && (
            <ul className="flex flex-col gap-y-3 font-extralight">
              <li>Total sales:   <span className="font-semibold ml-28">${stats.totalSales}</span></li>
              <li>Total sold items:   <span className="font-semibold ml-14">{stats.totalSoldItems}</span></li>
              <li>Total unsold items:   <span className="font-semibold ml-8">{stats.totalNotSoldItems}</span></li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
