import { useAuthContext } from '@/context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '@/components/common/PageLoader';

function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  // Show loader while checking authentication
  if (loading) {
    return <Loader />
  }

  // Not authenticated - redirect to login and save the attempted location
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check email verification status
  const isSocialUser = user.social_auth_provider || user.social_auth_id;
  // Social auth users are auto-verified
  const isVerified = user.email_verified || user.is_verified || isSocialUser;
  
  if (!isVerified) {
    return <Navigate to="/verify-email-notice" replace />;
  }

  // Role-based access control
  if (role) {
    // Map frontend role names to backend role names
    const roleMap = {
      'user': 'customer',
      'admin': 'admin',
      'customer': 'customer'
    };
    
    const requiredRole = roleMap[role] || role;
    const userRole = user.role || 'customer';
    
    if (userRole !== requiredRole) {
      // Redirect to appropriate dashboard
      if (userRole === 'admin') {
        return <Navigate to="/admin" replace />;
      } else if (userRole === 'customer') {
        return <Navigate to="/user" replace />;
      } else {
        return <Navigate to="/" replace />;
      }
    }
  }

  return children;
}

export default ProtectedRoute;