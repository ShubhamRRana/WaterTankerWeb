import { Outlet } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
