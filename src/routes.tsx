import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from './App'
import Landing from './pages/Landing'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Contact from './pages/Contact'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'privacy', element: <PrivacyPolicy /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
