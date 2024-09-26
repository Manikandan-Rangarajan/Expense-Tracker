// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import 'tailwindcss/tailwind.css';
import axios from 'axios'; // Import axios for API requests
import { useNavigate } from 'react-router-dom';

// Register the necessary elements for the pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [totalExpenses, setTotalExpenses] = useState(0); // Dynamic total expenses
  const [recentTransactions, setRecentTransactions] = useState([]); // Dynamic recent transactions
  const [expenseData, setExpenseData] = useState([]); // Expense data for pie chart

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); 
  console.log(userId)// Replace with the actual user ID

  // Fetch expenses data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/expenses/${userId}`);
        const expenses = response.data;

        // Update the state with fetched data
        setRecentTransactions(expenses);

        // Calculate the total expenses for this month
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        setTotalExpenses(total);

        // Group expenses by category for the pie chart
        const categories = {};
        expenses.forEach((expense) => {
          if (categories[expense.category]) {
            categories[expense.category] += expense.amount;
          } else {
            categories[expense.category] = expense.amount;
          }
        });

        const chartData = {
          labels: Object.keys(categories),
          datasets: [
            {
              label: 'Expenses by Category',
              data: Object.values(categories),
              backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0'],
              hoverBackgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0'],
              borderWidth: 1,
            },
          ],
        };

        setExpenseData(chartData);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleSubmit = async () => {
    navigate('/expense');
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Total Expense */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-bold mb-2">Total Expenses (This Month)</h2>
        <p className="text-3xl">{`$${totalExpenses}`}</p>
      </div>

      {/* Pie Chart for Expenses by Category */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-bold mb-4">Expenses by Category</h2>
        <div className="flex justify-center">
          <div style={{ width: '40%', height: '40%' }}>
            <Pie data={expenseData} />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
        <ul>
          {recentTransactions.map((transaction) => (
            <li key={transaction._id} className="flex justify-between items-center p-2 border-b">
              <span>{transaction.name}</span>
              <span>{`$${transaction.amount}`}</span>
              <span>{new Date(transaction.date).toLocaleDateString()}</span>
              <button className="bg-blue-500 text-white px-3 py-1 rounded-md">Edit</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Button to Add a New Expense */}
      <div className="text-right">
        <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded-lg">Add New Expense</button>
      </div>
    </div>
  );
};

export default Dashboard;
