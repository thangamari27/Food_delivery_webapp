import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '@/context/AuthContext';
import { authService } from '@/services/authService';

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateUser } = useAuthContext();
  const hasProcessed = useRef(false); // Prevent duplicate processing

  useEffect(() => {
    // Prevent running multiple times
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const handleCallback = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      const userParam = params.get('user');
      const error = params.get('error');

      // Handle error case
      if (error) {
        toast.error('Social authentication failed');
        navigate('/login', { replace: true });
        return;
      }

      // Validate required parameters
      if (!token || !userParam) {
        toast.error('Invalid authentication response');
        navigate('/login', { replace: true });
        return;
      }

      try {
        // Parse user data
        const user = JSON.parse(decodeURIComponent(userParam));
        
        // Store token (prefer localStorage for OAuth)
        localStorage.setItem('accessToken', token);
        authService.setAuthHeader(token);

        // Update auth context silently (no toast here)
        await updateUser();

        // Single success toast
        toast.success(`Welcome back, ${user.fullname}!`);
        
        // Determine redirect based on role
        const userRole = user.role || 'customer';
        const redirectPath = userRole === 'admin' ? '/admin' : '/user';
        
        // Small delay for better UX
        setTimeout(() => {
          navigate(redirectPath, { replace: true });
        }, 500);

      } catch (error) {
        console.error('OAuth callback error:', error);
        toast.error('Authentication failed. Please try again.');
        navigate('/login', { replace: true });
      }
    };

    handleCallback();
  }, []); // Run only once

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-indigo-100">
      <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Completing Sign In</h2>
        <p className="text-gray-600">Please wait a moment...</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;