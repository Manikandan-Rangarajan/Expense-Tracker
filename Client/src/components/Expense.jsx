import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import dotenv from 'dotenv';

const Expense = () => { 


  const ClientId = localStorage.getItem('clientId')

  const [expense, setExpense] = useState({
    name: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Food',
  });
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const baseurl = import.meta.env.url;

  let timeout = ()=>{
         setTimeout(3000,navigate('/home'))
  }



  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({
      ...expense,
      [name]: value,
    });
  };

  // Validate fields
  const validateFields = () => {
    let newErrors = {};
    if (!expense.name) newErrors.name = 'Expense name is required.';
    if (!expense.amount || isNaN(expense.amount) || expense.amount <= 0) {
      newErrors.amount = 'Please enter a valid amount.';
    }
    if (!expense.date) newErrors.date = 'Date is required.';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length === 0) {
      setLoading(true); // Set loading to true
      try {
        // Send POST request to backend using Axios
        const response = await axios.post(`${baseurl}/add-expense`, {
          ...expense},{headers:{"Authorization":`Bearer ${ClientId}`,'X-Custom-Header': 'CustomValue'}});

        // Handle successful response
        if (response.status === 200) {
          setConfirmationMessage('Expense added successfully!');
          setErrors({});
          // Clear form after submission
          setExpense({
            name: '',
            amount: '',
            date: new Date().toISOString().split('T')[0],
            category: 'Food',
          });
          timeout();
        }
      } catch (error) {
        console.error('Error adding expense:', error);
        setConfirmationMessage('Failed to add expense. Please try again.');
      } finally {
        setLoading(false); // Reset loading state
      }
    } else {
      setErrors(newErrors);
      setConfirmationMessage('');
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Add Expense</h2>
        <form onSubmit={handleSubmit}>
          {/* Expense Name/Description */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Expense Name/Description</label>
            <input
              type="text"
              name="name"
              value={expense.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="e.g., Lunch at McDonald's"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Amount Spent */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Amount Spent</label>
            <input
              type="number"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="e.g., 12.99"
            />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
          </div>

          {/* Date of Transaction */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={expense.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={expense.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Adding...' : 'Add Expense'}
          </button>
        </form>

        {/* Confirmation Message */}
        {confirmationMessage && (
          <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
            {confirmationMessage}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Expense;
