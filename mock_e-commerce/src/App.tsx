// import { useState } from 'react'
import NavBar from './components/NavBar.js'
import Body from './components/Body.js'
import './App.css'
import { CartProvider } from './contexts/CartContext.js'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <CartProvider>
      <NavBar />
      <Body />
    </CartProvider>
  )
}

export default App
