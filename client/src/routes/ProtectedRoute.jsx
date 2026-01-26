import { useAuthContext } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import Loader from '@/components/common/PageLoader';

function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuthContext();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check both fields and handle social login users differently
  const isSocialUser = user.social_auth_provider || user.social_auth_id;
  const needsVerification = !user.email_verified && !user.is_verified && !isSocialUser;
  
  if (needsVerification) {
    return <Navigate to="/verify-email-notice" replace />;
  }

  if (role) {
    // Map frontend role names to backend role names
    const roleMap = {
      'user': 'customer',
      'admin': 'admin',
      'customer': 'customer'
    };
    
    const requiredRole = roleMap[role] || role;
    const userRole = user.role || 'customer'; // Default for new users
    
    if (userRole !== requiredRole) {
      // Redirect based on user's actual role
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