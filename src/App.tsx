import { Outlet } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <Outlet />
      <Footer />
      <SpeedInsights />
    </div>
  )
}

export default App
