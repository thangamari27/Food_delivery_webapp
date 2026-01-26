import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingRoute from '@/routes/LandingRoute'
import UserRoute from '@/routes/UserRoute'
import AdminRoute from '@/routes/AdminRoute'
import ScrollToTop from '@/components/common/ScrollToTop'
import PageNotFound from '@/pages/PageNotFound'
import AuthPage from '@/pages/AuthPage'
import AuthCallbackPage from './pages/AuthCallbackPage'
import VerifyEmailPage from '@/pages/VerifyEmailPage'
import VerifyEmailNoticePage from '@/pages/VerifyEmailNoticePage'
import { AuthProvider } from './context/AuthContext'

import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <Routes>
          {/* Authentication Pages */}
          <Route path='/login' element={<AuthPage />} />
          <Route path='/auth/callback' element={<AuthCallbackPage />} />
          <Route path='/verify-email' element={<VerifyEmailPage />} />
          <Route path='/verify-email-notice' element={<VerifyEmailNoticePage />} />
          
          {/* Role based Routes */}
          {LandingRoute}
          {UserRoute}
          {AdminRoute}
          
          {/* 404 page */}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App