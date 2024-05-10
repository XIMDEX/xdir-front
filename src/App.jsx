import { useLocation } from 'react-router-dom'
import Routes from './routes/Routes'


function App() {
  const location = useLocation()
  const usePaddingTop = location.pathname === '/register' || location.pathname === 'login'

  return (
    <div className='App' style={{paddingTop: usePaddingTop ? '3rem' : '5rem'}}>
    <Routes/>
  </div>
  )
}

export default App
