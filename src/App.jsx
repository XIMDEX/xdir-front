import { useLocation } from 'react-router-dom'
import Routes from './routes/Routes'
import Navbar from './components/Navbar'


function App() {
  const location = useLocation()

  return (
    <div className='App'>
    <Navbar/>
    <Routes/>
  </div>
  )
}

export default App
