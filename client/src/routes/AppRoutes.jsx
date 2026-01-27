import { Routes, Route, Navigate } from 'react-router-dom'
import LandingRoute from '@/routes/LandingRoute'
import UserRoute from '@/routes/UserRoute'
import AdminRoute from '@/routes/AdminRoute'
import ScrollToTop from '@/components/common/ScrollToTop'
import PageNotFound from '@/pages/PageNotFound'
import AuthPage from '@/pages/AuthPage'
import AuthCallbackPage from '@/pages/AuthCallbackPage'
import VerifyEmailPage from '@/pages/VerifyEmailPage'
import VerifyEmailNoticePage from '@/pages/VerifyEmailNoticePage'
import ResetPasswordPage from '@/pages/ResetPasswordPage'
import { useAuthContext } from '../context/AuthContext'
import { Toaster } from 'react-hot-toast'

// Component to redirect authenticated users away from auth pages
function AuthRedirect({ children }) {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  // If user is authenticated, redirect to appropriate dashboard
  if (user) {
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/user" replace />;
    }
  }

  return children;
}

function AppRoutes() {
  return (
    <>
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
        {/* Authentication Pages - Redirect if already logged in */}
        <Route 
          path='/login' 
          element={
            <AuthRedirect>
              <AuthPage />
            </AuthRedirect>
          } 
        />
        <Route path='/auth/callback' element={<AuthCallbackPage />} />
        <Route path='/verify-email' element={<VerifyEmailPage />} />
        <Route path='/verify-email-notice' element={<VerifyEmailNoticePage />} />
        
        {/* Reset Password - Public route, no auth redirect needed */}
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        
        {/* Role based Routes */}
        {LandingRoute}
        {UserRoute}
        {AdminRoute}
        
        {/* 404 page */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default AppRoutes