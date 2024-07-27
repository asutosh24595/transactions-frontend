export default function Search({searchTerm, onSearchChange}) {

    const handleChange = (e) => {
        onSearchChange(e.target.value);
    } 
    

  return (
    <input
      type="text"
      placeholder="Search transaction"
      className="p-2 border rounded-md border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      value={searchTerm}
      onChange={handleChange}
    />
  );
}
