import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import ShoppingPage from './Components/ShoppingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ShoppingPage/>
    </>
  )
}

export default App
