import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignIn from './components/SignIn'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <SignIn/>
      </div>
    </>
  )
}

export default App
