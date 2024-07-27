import axios from "axios";

export const getAllTransactions = async (
  selectedMonth = "March",
  search = "",
  page = 1
) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/transactions?month=${selectedMonth}&search=${search}&page=${page}`
    );
    return response.data;
  } catch (err) {
    console.error(
      "Error fetching transactions:",
      err.response ? err.response.data : err.message
    );
    throw new Error(
      "Failed to fetch transactions: An error occurred!"
    );
  }
};

export const getStatsByMonth = async (selectedMonth = "March") => {
  try {
    const response = await axios.get(
      `http://localhost:4000/transactions/combined?month=${selectedMonth}`
    );
    return response.data;
  } catch (err) {
    console.error(
      "Error fetching statistics: ",
      err.response ? err.response.data : err.message
    );
    throw new Error(
        "Failed to fetch statistics: An error occurred!"
    );
  }
};
