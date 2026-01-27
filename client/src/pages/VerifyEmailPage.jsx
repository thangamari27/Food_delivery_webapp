import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import { toast } from 'react-hot-toast';
import Loader from '@/components/common/PageLoader';

function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updateUser, user } = useAuthContext();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      toast.error('Invalid verification link');
      navigate('/login');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await authService.verifyEmail(token);
        
        if (response.data.success) {
          toast.success(response.data.message || 'Email verified successfully!');
          
          // Check if user is already logged in (from signup)
          const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
          
          if (accessToken) {
            // User is logged in, update their profile and redirect to dashboard
            try {
              const updatedUser = await updateUser();
              
              setTimeout(() => {
                // Redirect based on role
                if (updatedUser.role === 'admin') {
                  navigate('/admin', { replace: true });
                } else {
                  navigate('/user', { replace: true });
                }
              }, 1500);
            } catch (err) {
              console.log('Failed to update user, redirecting to login');
              setTimeout(() => {
                navigate('/login', { replace: true });
              }, 2000);
            }
          } else {
            // User not logged in, redirect to login
            setTimeout(() => {
              navigate('/login', { replace: true });
            }, 2000);
          }
        }
      } catch (error) {
        console.error('Verification error:', error);
        toast.error(error.response?.data?.message || 'Verification failed');
        
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 3000);
      }
    };

    verifyEmail();
  }, [token, navigate, updateUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Verifying Email</h2>
          <p className="mt-2 text-gray-600">
            Please wait while we verify your email address...
          </p>
        </div>
        <Loader />
      </div>
    </div>
  );
}

export default VerifyEmailPage;