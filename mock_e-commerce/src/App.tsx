import { AppProvider } from './contexts/CartContext.js'
import NavBar from './components/NavBar.js'
import Body from './components/Body.js'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <AppProvider>
      <NavBar />
      <Body />
    </AppProvider>
  )
}

export default App
