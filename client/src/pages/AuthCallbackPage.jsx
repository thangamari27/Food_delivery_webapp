import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '@/context/AuthContext';

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateUser } = useAuthContext();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      const refreshToken = params.get('refresh');
      const userParam = params.get('user');
      const error = params.get('error');

      if (error) {
        toast.error('Social authentication failed');
        navigate('/login');
        return;
      }

      if (token && userParam) {
        try {
          // Store tokens
          localStorage.setItem('accessToken', token);
          if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
          }

          // Parse user data
          const user = JSON.parse(decodeURIComponent(userParam));
          
          // Update auth context
          await updateUser();

          toast.success('Login successful!');
          
          // Default role for new OAuth users should be 'customer'
          const userRole = user.role || 'customer';
          
          // Redirect based on role
          if (userRole === 'admin' || userRole === 'admin') {
            navigate('/admin');
          } else if (userRole === 'customer' || userRole === 'user') {
            navigate('/user');
          } else {
            // Default fallback
            navigate('/user');
          }
        } catch (error) {
          console.error('Callback error:', error);
          toast.error('Authentication failed');
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    handleCallback();
  }, [location, navigate, updateUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;