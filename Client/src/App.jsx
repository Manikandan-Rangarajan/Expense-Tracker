import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignIn from './components/SignIn'
import Info from './components/Info'
import History from './components/History'
import Navbar from './components/Navbar'
import Report from './components/Report'
import Login from './components/Login'
import Tracker from './components/Tracker'
import Dashboard from './components/Dashboard'
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom'
import Expense from './components/Expense'
import Logout from './components/Logout'

function App() {
  const [count, setCount] = useState(0)
  const clientId = localStorage.getItem('clientId');

  return (
    <Router>
      
    {/* <History/>
    {/* <Info/> */}
    {/* <Report/> */}
 <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 text-xl overflow-y-hidden'>
  <Routes>
  
     <Route path="/history" element={<History />} />
     <Route path="/home" element={<Dashboard />} />
     <Route path="/info" element={<Info />} />
     <Route path="/report" element={<Report />} />
     <Route path="/tracker" element={<Tracker />} />
     <Route path="/" element={<SignIn />} />
     <Route path="/login" element={<Login />} />
     <Route path="/logout" element={<Logout />} />
     {/* <Route path="/api/names" element={<History />} /> */}
     <Route path="/expense" element={<Expense />} />
           {/* redirects unmatched path to home
           <Route path="*" element={<Navigate to="/" />} />  */}
   </Routes>
  </div>
</Router>
  )
}

export default App
