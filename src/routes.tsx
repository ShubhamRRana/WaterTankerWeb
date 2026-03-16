import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from './App'
import Landing from './pages/Landing'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Contact from './pages/Contact'
import AuthSuccess from './pages/AuthSuccess'
import ResetPassword from './pages/ResetPassword'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'privacy', element: <PrivacyPolicy /> },
      { path: 'contact', element: <Contact /> },
      { path: 'auth/success', element: <AuthSuccess /> },
      { path: 'auth/reset-password', element: <ResetPassword /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
