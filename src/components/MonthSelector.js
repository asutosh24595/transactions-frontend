export default function MonthSelector ({selectedMonth, onMonthChange})  {

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    
      const handleChange = (event) => {
        onMonthChange(event.target.value);
      };

    return (
        <select
        value={selectedMonth}
        onChange={handleChange}
        className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {months.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>
    )
}