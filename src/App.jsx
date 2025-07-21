import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import PortfolioPage from './pages/PortfolioPage'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
