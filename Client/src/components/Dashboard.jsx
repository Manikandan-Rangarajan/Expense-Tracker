// // src/components/Dashboard.jsx
// import React, { useEffect, useState } from 'react';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Pie } from 'react-chartjs-2';
// import 'tailwindcss/tailwind.css';
// import axios from 'axios'; // Import axios for API requests
// import { useNavigate } from 'react-router-dom';
// import Loader from './Loader';

// // Register the necessary elements for the pie chart
// ChartJS.register(ArcElement, Tooltip, Legend);

// const Dashboard = () => {
//   const [totalExpenses, setTotalExpenses] = useState(0); // Dynamic total expenses
//   const [recentTransactions, setRecentTransactions] = useState([]); // Dynamic recent transactions
//   const [expenseData, setExpenseData] = useState([]); // Expense data for pie chart
//   const [loader, setLoader] = useState(true);

//   const navigate = useNavigate();

//   const clientId = localStorage.getItem('clientId')
//   console.log(clientId)

//  // Fetch expenses data from backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://51.20.190.73:5000/expenses`,{headers:{"Authorization":`Bearer ${clientId}`}});
//         const expenses = response.data;
//         // console.log(expenses.map(expense => expense.amount))
//         console.log(expenses)
//         expenses.forEach((expens=>{
//           console.log(expens?.amount)
//         }))


//         // Update the state with fetched data
//         setRecentTransactions(expenses);
//         console.log(recentTransactions)
//         // setLoading(false); 

//       //  Calculate the total expenses for this month
//         const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
//         setTotalExpenses(total);
//         console.log(total)

//       //  Group expenses by category for the pie chart
//         const categories = {};
//         expenses.forEach((expense) => {
//           if (categories[expense.category]) {
//             categories[expense.category] += expense.amount;
//           } else {
//             categories[expense.category] = expense.amount;
//           }
//         });

//         const chartData = {
//           labels: Object.keys(categories),
//           datasets: [
//             {
//               label: 'Expenses by Category',
//               data: Object.values(categories),
//               backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0'],
//               hoverBackgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0'],
//               borderWidth: 1,
//             },
//           ],
//         };

//         setExpenseData(chartData);
//       } catch (error) {
//         console.error('Error fetching expenses:', error);
//       }
//     };

//     fetchData();
//   },[clientId]);

//   // useEffect(()=>{
//   //  const fetchdata = async ()=>{
//   //     const resp = await axios.get('http://51.20.190.73:5000/')
//   //  }
//   // })

//   const handleSubmit = async () => {
//     navigate('/expense');
//   };

//   // if (loading) {
//   //   return <Loader />;
//   // }

//   return (
//     <div className="container mx-auto p-5">
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

//       {/* Total Expense */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-lg font-bold mb-2">Total Expenses (This Month)</h2>
//         <p className="text-3xl">{`$${totalExpenses}`}</p>
//       </div>

//       {/* Pie Chart for Expenses by Category */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-lg font-bold mb-4">Expenses by Category</h2>
//         <div className="flex justify-center">
//           <div style={{ width: '40%', height: '40%' }}>
//                 <Pie data={expenseData || []  } />
//           </div>
//         </div>  
//       </div>

//       {/* Recent Transactions */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
//         <ul>
//         {recentTransactions.length > 0 ? recentTransactions.map((transaction) => (
//       <li key={transaction._id} className="flex justify-between items-center p-2 border-b">
//         <span>{transaction.name}</span>
//         <span>{`$${transaction.amount}`}</span>
//         <span>{new Date(transaction.date).toLocaleDateString()}</span>
//         <button className="bg-blue-500 text-white px-3 py-1 rounded-md">Edit</button>
//         <button className="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
//       </li>
//     )) : <p>No transactions available.</p>}
//         </ul>
//       </div>

//       {/* Button to Add a New Expense */}
//       <div className="text-right">
//         <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded-lg">Add New Expense</button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


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
import Loader from './Loader'; // Import the loader
import Navbar from './Navbar';

// Register the necessary elements for the pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [totalExpenses, setTotalExpenses] = useState(0); // Dynamic total expenses
  const [recentTransactions, setRecentTransactions] = useState([]); // Dynamic recent transactions
  const [expenseData, setExpenseData] = useState([]); // Expense data for pie chart
  const [loading, setLoading] = useState(true); // Loader state
  const navigate = useNavigate();

  const clientId = localStorage.getItem('clientId');

  // Fetch expenses data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/expenses`, {
          headers: { "Authorization": `Bearer ${clientId}` }
        });
        const expenses = response.data;
        console.log(expenses)

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
         setLoading(false); 
      } catch (error) {
        console.error('Error fetching expenses:', error);
        setLoading(false); // Hide the loader even if there is an error
      }
    };

    fetchData();
  }, [clientId]);

  const handleSubmit = async () => {
    navigate('/expense');
  };

  // const handleDelete = async (transactionId) => {

  //   try{
  //     const response = await axios.post("http://51.20.190.73:5000/deleteTransaction", {id: transactionId},{
  //       headers: { "Authorization": `Bearer ${clientId}` }})

  //       if(response.status == 200){
  //         setRecentTransactions(recentTransactions.filter(transaction => transaction._id !== transactionId));
  //       }
  //   }catch(error){

  //   }
  // };

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
        setRecentTransactions((prevTransactions) =>
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

  // Show loader while loading data
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-5">
      <div className='m-[50px]'>
      <Navbar/>
      </div>
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
            <Pie data={expenseData || []} />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
        <ul>
          {recentTransactions.length > 0 ? recentTransactions.map((transaction) => (
            <li key={transaction._id} className="flex justify-between items-center p-2 border-b">
              <span>{transaction.name}</span>
              <span>{`$${transaction.amount}`}</span>
              <span>{new Date(transaction.date).toLocaleDateString()}</span>
              <button onClick={()=>handleEdit(transaction._id)} className="bg-blue-500 text-white px-3 py-1 rounded-md">Edit</button>
              <button onClick={()=>handleDelete(transaction._id)} className="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
            </li>
          )) : <p>No transactions available.</p>}
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
