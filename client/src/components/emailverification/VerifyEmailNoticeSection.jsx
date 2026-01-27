import { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useCountdown } from '@/hooks/useEmailCountdown';

function VerifyEmailNoticeSection() {
  const { user, logout, updateUser } = useAuthContext();
  const navigate = useNavigate();
  const [resending, setResending] = useState(false);
  const [checking, setChecking] = useState(false);
  const { seconds, start: startCountdown, isActive } = useCountdown(0);

  const handleResendEmail = async () => {
    if (isActive || resending) return;
    
    setResending(true);
    try {
      await authService.resendVerification();
      toast.success('Verification email sent! Please check your inbox.');
      startCountdown(60); // 60 seconds cooldown
    } catch (error) {
      console.error('Resend error:', error);
      toast.error(error.response?.data?.message || 'Failed to resend email');
    } finally {
      setResending(false);
    }
  };

  const handleCheckVerification = async () => {
    if (checking) return;
    
    setChecking(true);
    try {
      const updatedUser = await updateUser();
      
      if (updatedUser.email_verified || updatedUser.is_verified) {
        toast.success('Email verified! Redirecting to dashboard...');
        
        setTimeout(() => {
          // Navigate based on role
          if (updatedUser.role === 'admin') {
            navigate('/admin', { replace: true });
          } else {
            navigate('/user', { replace: true });
          }
        }, 1000);
      } else {
        toast.info('Email not verified yet. Please check your inbox.');
      }
    } catch (error) {
      console.error('Check verification error:', error);
      toast.error('Failed to check verification status');
    } finally {
      setChecking(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Verify Your Email</h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a verification link to
          </p>
          <p className="mt-1 text-sm font-semibold text-orange-600">
            {user?.email}
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-700 text-center">
            Please check your email and click the verification link to activate your account.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleCheckVerification}
            disabled={checking}
            className="w-full bg-orange-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {checking ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Checking...
              </span>
            ) : (
              "I've Verified My Email"
            )}
          </button>

          <button
            onClick={handleResendEmail}
            disabled={isActive || resending}
            className="w-full border border-gray-300 text-gray-700 rounded-lg px-4 py-3 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isActive 
              ? `Resend in ${seconds}s` 
              : resending 
                ? 'Sending...' 
                : 'Resend Verification Email'
            }
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-gray-600 text-sm hover:text-gray-800 transition-colors py-2"
          >
            Logout
          </button>
        </div>

        {/* Help Text */}
        <div className="text-center text-xs text-gray-500 space-y-1 pt-4 border-t">
          <p>Didn't receive the email? Check your spam folder.</p>
          <p>Still having issues? Contact our support team.</p>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailNoticeSection;