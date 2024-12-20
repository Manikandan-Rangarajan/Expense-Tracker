import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const History = () => {
  // State to manage expenses and pagination
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [currentPage, setCurrentPage] = useState(1);
  const expensesPerPage = 5;

  // State for filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  // Pagination Logic
  const totalPages = Math.ceil(filteredExpenses.length / expensesPerPage);
  const currentExpenses = filteredExpenses.slice(
    (currentPage - 1) * expensesPerPage,
    currentPage * expensesPerPage
  );

  const clientId = localStorage.getItem('clientId');
  console.log(clientId)
  const baseurl = import.meta.env.VITE_URL;

  // Filter expenses based on search term, category, and date range
  useEffect(() => {
    let filtered = expenses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(exp =>
        exp.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter(exp => exp.category === categoryFilter);
    }

    // Filter by date range
    if (dateRange.from && dateRange.to) {
      filtered = filtered.filter(exp =>
        new Date(exp.date) >= new Date(dateRange.from) &&
        new Date(exp.date) <= new Date(dateRange.to)
      );
    }

    setFilteredExpenses(filtered);
  }, [searchTerm, categoryFilter, dateRange, expenses]);

  useEffect(()=>{
      const fetchData = async ()=>{
        try{
 
          const response = await axios.get(`${baseurl}/history`,
            {headers:{"Authorization":`Bearer ${clientId}`}});
          
            if(response.status == 200){
              const exp = response.data;
              console.log(exp);
              // console.log(exp.map(expense => expense.name));
              setExpenses(response.data);
            }
         

        }catch(e){
          console.error('Error fetching expenses:', e);
        }
      } 
      fetchData();
  },[clientId])


  const handleDelete = async (transactionId) => {
    try{
      const payload = { id: transactionId }
      // Send a POST request to delete the transaction, including the transaction ID and authorization token
      const response = await axios.post(
        "http://localhost:3000/deleteTransaction",
        payload,
// Data payload containing the transaction ID
        {
          headers: { 
            "Authorization": `Bearer ${clientId}` // Authorization token from clientId
          }
        }
      );
  
      // If the response status is 200, remove the deleted transaction from the recent transactions list
      if (response.status === 200) {
        setExpenses((prevTransactions) =>
          prevTransactions.filter(transaction => transaction._id !== transactionId)
        );
      } else {
        console.error('Failed to delete the transaction');
      }
    } catch (error) {
      console.error('Error deleting the transaction:', error);
    }
  };
  

  const handleEdit = async (e) => {
    navigate('/expense');
  };

  return (
    <div className="">
      <Navbar/>
    
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Expense History</h1>

      {/* Filter Section */}
      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          {/* Date Range Filter */}
          <div>
            <label className="block mb-1">From</label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              className="border p-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1">To</label>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              className="border p-2 rounded-lg"
            />
          </div>
        </div>
        <div className="flex space-x-4 mb-4">
          {/* Category Filter */}
          <div>
            <label className="block mb-1">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border p-2 rounded-lg"
            >
              <option value="">All</option>
              <option value="Food">Food</option>
              <option value="Housing">Housing</option>
              <option value="Transportation">Transportation</option>
              {/* Add more categories here */}
            </select>
          </div>

          {/* Search Filter */}
          <div>
            <label className="block mb-1">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by description"
              className="border p-2 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Expense List with Pagination */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Expenses</h2>
        <ul>
          {currentExpenses.map(exp => (
            <li key={exp.id} className="flex justify-between items-center p-2 border-b w-[600px]">
              <span>{exp.description}</span>
              <span>{`$${exp.amount}`}</span>
              <span>{exp.date}</span>
              <span>{exp.category}</span>
              <button onClick={() => handleEdit(exp.id)} className="bg-blue-500 text-white px-3 py-1 rounded-md">Edit</button>
              <button onClick={() => handleDelete(exp.id)} className="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
            </li>
          ))}
        </ul>
        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default History;
