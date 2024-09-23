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

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      
    {/* <Navbar/> */}
 <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 text-xl overflow-y-hidden'>
  <Routes>
  
     <Route path="/logout" element={<History />} />
     <Route path="/home" element={<Dashboard />} />
     <Route path="/MyProjects" element={<Info />} />
     <Route path="/pricing" element={<Report />} />
     <Route path="/projects" element={<Tracker />} />
     <Route path="/" element={<SignIn />} />
     <Route path="/login" element={<Login />} />
     <Route path="/api/names" element={<History />} />
           {/* redirects unmatched path to home
           <Route path="*" element={<Navigate to="/" />} />  */}
   </Routes>
  </div>
</Router>
  )
}

export default App
