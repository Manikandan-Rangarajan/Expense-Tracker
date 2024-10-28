import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import Navbar from './Navbar';
import axios from 'axios';
import dotenv from 'dotenv';

const Report = () => {
  const [selectedPeriod, setSelectedPeriod] = useState({ type: 'monthly', month: '', year: '' });
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [expenses, setExpenses] = useState([]); // Expense data for pie chart
  const baseurl = import.meta.env.VITE_URL;


  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const response = await axios.get(`${baseurl}/report`, {
          headers: { "Authorization": `Bearer ${clientId}` }})
          console.log(response.data)
          setExpenses(response.data);
      }catch(e){
        
      }
    }
    fetchData();
  })
  // Dummy data for the bar chart
  const barData = {
    labels: [], // Days of the month or months of the year
    datasets: [
      {
        label: 'Expenses',
        data: [], // Total expenses for each day/month
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod({
      ...selectedPeriod,
      [e.target.name]: e.target.value,
    });
  };

  const generateReport = () => {
    // Filter expenses based on selected period
    // This will depend on whether the user chose 'monthly' or 'yearly'
    // Here you would calculate daily totals for monthly, or monthly totals for yearly reports
    const expensesInPeriod = filterExpensesByPeriod(expenses, selectedPeriod);
    setFilteredExpenses(expensesInPeriod);

    // Generate data for the bar chart
    updateBarChart(expensesInPeriod);
  };

  const filterExpensesByPeriod = (expenses, period) => {
    // Filter logic based on period (monthly/yearly)
    // Return filtered list of expenses
    return expenses; // Replace with actual filtering logic
  };

  const updateBarChart = (expenses) => {
    // Update the bar chart data based on the filtered expenses
    // For example, sum up the expenses per day (for monthly) or per month (for yearly)
  };

  const calculateTotalsByCategory = (expenses) => {
    // Calculate total expenses for each category
    const totals = {};
    expenses.forEach(expense => {
      if (!totals[expense.category]) {
        totals[expense.category] = 0;
      }
      totals[expense.category] += expense.amount;
    });
    return totals;
  };

  const handleDownload = () => {
    // Create CSV data from filtered expenses
    const csvData = filteredExpenses.map(exp => `${exp.date},${exp.category},${exp.amount}`).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'expense_report.csv');
  };

  return (
    <div>
      <Navbar/>
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Expense Reports</h1>

      {/* Select Period (Monthly/Yearly) */}
      <div className="mb-4">
        <label className="block mb-2">Select Report Type</label>
        <select name="type" value={selectedPeriod.type} onChange={handlePeriodChange} className="border p-2 rounded-lg">
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Month/Year Inputs */}
      {selectedPeriod.type === 'monthly' && (
        <div className="mb-4">
          <label className="block mb-2">Select Month</label>
          <input type="month" name="month" value={selectedPeriod.month} onChange={handlePeriodChange} className="border p-2 rounded-lg" />
        </div>
      )}
      {selectedPeriod.type === 'yearly' && (
        <div className="mb-4">
          <label className="block mb-2">Select Year</label>
          <input type="year" name="year" value={selectedPeriod.year} onChange={handlePeriodChange} className="border p-2 rounded-lg" />
        </div>
      )}

      {/* Generate Report Button */}
      <button onClick={generateReport} className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4">
        Generate Report
      </button>

      {/* Bar Chart */}
      {filteredExpenses.length > 0 && (
        <div className="mb-8">
          <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} height={400} />
        </div>
      )}

      {/* Total Expenses by Category */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Total Expenses by Category</h2>
        <ul>
          {Object.entries(calculateTotalsByCategory(filteredExpenses)).map(([category, total]) => (
            <li key={category} className="mb-2">
              <span className="font-bold">{category}:</span> ${total}
            </li>
          ))}
        </ul>
      </div>

      {/* Download/Print Buttons */}
      <div className="flex space-x-4">
        <button onClick={handleDownload} className="bg-green-500 text-white px-4 py-2 rounded-lg">Download CSV</button>
        <button onClick={() => window.print()} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Print Report</button>
      </div>
    </div>
    </div>
  );
};

export default Report;
