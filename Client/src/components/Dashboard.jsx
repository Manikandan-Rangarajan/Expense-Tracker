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
import { useNavigate } from 'react-router-dom';

// Register the necessary elements for the pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [totalExpenses, setTotalExpenses] = useState(3500);
  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, description: 'Groceries', amount: 200, date: '2024-09-01' },
    { id: 2, description: 'Rent', amount: 1000, date: '2024-09-02' },
    { id: 3, description: 'Utilities', amount: 300, date: '2024-09-03' },
  ]);

  const navigate = useNavigate();

  // Pie chart data
  const data = {
    labels: ['Groceries', 'Rent', 'Utilities', 'Miscellaneous'],
    datasets: [
      {
        label: 'Expenses by Category',
        data: [200, 1000, 300, 2000],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0'],
        hoverBackgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0'],
        borderWidth: 1,
      },
    ],
  };

  const handleSubmit = async()=>{
    navigate('/expense')
  }

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
    <Pie data={data} />
  </div>
</div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
        <ul>
          {recentTransactions.map((transaction) => (
            <li key={transaction.id} className="flex justify-between items-center p-2 border-b">
              <span>{transaction.description}</span>
              <span>{`$${transaction.amount}`}</span>
              <span>{transaction.date}</span>
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
