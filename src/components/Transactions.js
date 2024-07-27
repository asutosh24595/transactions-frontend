import { useEffect, useState } from "react";
import { getAllTransactions } from "../api/api";
import MonthSelector from "./MonthSelector";
import Search from "./Search";

export default function Transactions({ selectedMonth, onMonthChange }) {
  const [transactionsData, setTransactionsData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllTransactions(selectedMonth, searchTerm, page);
        const {
          transactions,
          page: currentPage,
          perPage: itemsPerPage,
          totalPages,
        } = data;

        setTransactionsData(transactions);
        setPage(currentPage);
        setPerPage(itemsPerPage);
        setTotalPages(totalPages);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [page, perPage, searchTerm, selectedMonth]);

  const handleSearchInput = (input) => {
    setSearchTerm(input);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;

    if (typeof text === "number") {
      text = text.toString();
    }

    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <mark key={index}>{part}</mark>
      ) : (
        part
      )
    );
  };

  const getStartingIndex = (page, perPage) => (page - 1) * perPage;

  return (
    <>
      {error ? (
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded mb-10">
          <p>{error}</p>
        </div>
      ) : (
        <div className="w-full p-6 flex flex-col justify-center gap-y-20">
          <div className="flex items-center justify-between p-4">
            <div>
              <Search
                searchTerm={searchTerm}
                onSearchChange={handleSearchInput}
              />
            </div>
            <div>
              <MonthSelector
                selectedMonth={selectedMonth}
                onMonthChange={onMonthChange}
              />
            </div>
          </div>
          <div className="w-full">
            <table className="divide-y divide-gray-200 w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Sold
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 divide-y divide-gray-200">
                {transactionsData.length > 0 ? (
                  transactionsData.map((transaction, index) => (
                    <tr key={transaction._id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {getStartingIndex(page, perPage) + index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {highlightText(transaction.title, searchTerm)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {highlightText(transaction.description, searchTerm)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${" "}
                        {highlightText(
                          transaction.price.toFixed(2),
                          searchTerm
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {transaction.category}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {transaction.sold ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={transaction.image}
                          alt={transaction.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                    >
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>
              <p>Page No: {page}</p>
            </span>
            <span className="flex items-center gap-x-8">
              <span>
                <button
                  disabled={totalPages === 1 || page === totalPages}
                  className="hover:text-gray-900 text-gray-500"
                  onClick={handleNextPage}
                >
                  Next
                </button>
              </span>
              <span>-</span>
              <span>
                <button
                  disabled={totalPages === 1 || page === 1}
                  className="hover:text-gray-900 text-gray-500"
                  onClick={handlePreviousPage}
                >
                  Previous
                </button>
              </span>
            </span>
            <span>Per Page: {perPage}</span>
          </div>
        </div>
      )}
    </>
  );
}
