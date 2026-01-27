import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { Route } from "react-router-dom"
import Landing from "@/layouts/Landing"
import HomePage from "@/pages/HomePage"
import AboutPage from "@/pages/AboutPage"
import MenuPage from "@/pages/MenuPage"
import RestaurantPage from "@/pages/RestaurantPage"
import OfferPage from "@/pages/OfferPage"
import ServicePage from "@/pages/ServicePage"
import ContactPage from "@/pages/ContactPage"
import Loader from '@/components/common/PageLoader';

function LandingRedirect({ children }) {
  const { user, loading } = useAuthContext();

  // Show loader while checking authentication
  if (loading) {
    return <Loader />;
  }

  // If user is authenticated, redirect based on role
  if (user) {
    // Check email verification status
    const isSocialUser = user.social_auth_provider || user.social_auth_id;
    const isVerified = user.email_verified || user.is_verified || isSocialUser;
    
    if (!isVerified) {
      return <Navigate to="/verify-email-notice" replace />;
    }

    // Redirect based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/user" replace />;
    }
  }

  // User is not logged in, show landing page
  return children;
}

const LandingRoute = (
  <Route element={
    <LandingRedirect>  {/* Wrap Landing with redirect */}
      <Landing />
    </LandingRedirect>
  }>
    <Route path='/' element={<HomePage />} />
    <Route path='/about' element={<AboutPage />} />
    <Route path='/menu' element={<MenuPage />} />
    <Route path='/restaurant' element={<RestaurantPage />} />
    <Route path='/offer' element={<OfferPage />} />
    <Route path='/service' element={<ServicePage />} />
    <Route path='/contact' element={<ContactPage />} />
  </Route>
)

export default LandingRoute