import { useState, useCallback } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSocialLogin = useCallback((provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/${provider}`;
  }, []);

  const handleSubmit = useCallback(async (formData, rememberMeValue) => {
    // Prevent double submission
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      const loginData = {
        identifier: formData.email.trim(), // Trim whitespace
        password: formData.password,
        rememberMe: rememberMeValue
      };

      const result = await login(loginData);
      
      if (result.success) {
        const userRole = result.user.role;
        
        // Check if email is verified
        if (!result.user.email_verified && !result.user.is_verified) {
          toast.info('Please verify your email to continue');
          navigate('/verify-email-notice', { replace: true });
          return;
        }

        // Success toast
        toast.success('Login successful!');
        
        // Navigate based on role
        if (userRole === 'admin') {
          navigate('/admin', { replace: true });
        } else if (userRole === 'customer') {
          navigate('/user', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } else {
        // Show error from backend
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }, [login, navigate, isSubmitting]);

  return {
    rememberMe,
    setRememberMe,
    handleSocialLogin,
    handleSubmit,
    isSubmitting
  };
}