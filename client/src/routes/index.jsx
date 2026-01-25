import { createBrowserRouter } from 'react-router-dom';
import LandingRoute from './LandingRoute';
import UserRoute from './UserRoute';
import AdminRoute from './AdminRoute';
import ScrollToTop from '@/components/common/ScrollToTop';
import AuthPage from '@/pages/AuthPage';
import VerifyEmailPage from '@/pages/VerifyEmailPage';
import VerifyEmailNoticePage from '@/pages/VerifyEmailNoticePage';
import PageNotFound from '@/pages/PageNotFound';

const router = createBrowserRouter([
  // Public routes
  {
    path: '/login',
    element: (
      <>
        <ScrollToTop />
        <AuthPage initialPage="login" />
      </>
    )
  },
  {
    path: '/signup',
    element: (
      <>
        <ScrollToTop />
        <AuthPage initialPage="signup" />
      </>
    )
  },
  {
    path: '/verify-email',
    element: (
      <>
        <ScrollToTop />
        <VerifyEmailPage />
      </>
    )
  },
  {
    path: '/verify-email-notice',
    element: (
      <>
        <ScrollToTop />
        <VerifyEmailNoticePage />
      </>
    )
  },
  {
    path: '/reset-password',
    element: (
      <>
        <ScrollToTop />
        <AuthPage initialPage="forgotPassword" />
      </>
    )
  },
  
  // Role-based routes (your existing routes)
  LandingRoute,
  UserRoute,
  AdminRoute,
  
  // 404 page
  {
    path: '*',
    element: (
      <>
        <ScrollToTop />
        <PageNotFound />
      </>
    )
  }
]);

export default router;