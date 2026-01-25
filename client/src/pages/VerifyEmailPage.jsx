import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/authService';
import { toast } from 'react-hot-toast';
import Loader from '@/components/common/PageLoader';

function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updateUser } = useAuth();
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
          toast.success('Email verified successfully!');
          
          // Update user context
          await updateUser();
          
          // Redirect after delay
          setTimeout(() => {
            navigate('/user');
          }, 2000);
        }
      } catch (error) {
        console.error('Verification error:', error);
        toast.error(error.response?.data?.message || 'Verification failed');
        navigate('/login');
      }
    };

    verifyEmail();
  }, [token, navigate, updateUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
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