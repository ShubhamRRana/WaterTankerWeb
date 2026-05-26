import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { isVideoThemedRoute } from './lib/videoTheme'

function App() {
  const { pathname } = useLocation()
  const isVideoThemed = isVideoThemedRoute(pathname)

  return (
    <div className={`min-h-dvh flex flex-col ${isVideoThemed ? 'bg-black' : 'bg-background'}`}>
      {!isVideoThemed && <Header />}
      <Outlet />
      {!isVideoThemed && <Footer />}
      <SpeedInsights />
    </div>
  )
}

export default App
