import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Info = ({ expenses, onUpdateExpense }) => {
  const { id } = useParams(); // Retrieve expense ID from the URL
  const navigate = useNavigate();
  
  // Find the expense by ID
  const expenseToEdit = expenses.find(exp => exp.id === parseInt(id));

  // If the expense is not found, redirect back to the expense history page
  useEffect(() => {
    if (!expenseToEdit) {
      navigate('/expenses');
    }
  }, [expenseToEdit, navigate]);

  // Set initial state with the expense data
  const [formData, setFormData] = useState({
    description: expenseToEdit?.description || '',
    category: expenseToEdit?.category || '',
    amount: expenseToEdit?.amount || '',
    date: expenseToEdit?.date || '',
  });

  const [confirmationMessage, setConfirmationMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate an API call or state update
    const updatedExpense = {
      ...expenseToEdit,
      ...formData,
    };

    onUpdateExpense(updatedExpense); // Call the function to update the expense in parent component or backend

    // Show confirmation message
    setConfirmationMessage('Expense updated successfully!');

    // Redirect back to expense history after a brief delay
    setTimeout(() => {
      navigate('/expenses');
    }, 2000);
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Edit Expense</h1>

      {confirmationMessage && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
          {confirmationMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Description */}
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Housing">Housing</option>
            <option value="Bills">Bills</option>
            {/* Add more categories here */}
          </select>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label className="block mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Info;
