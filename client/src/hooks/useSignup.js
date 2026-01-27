import { useCallback } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';

export function useSignup() {
  const { register, login } = useAuthContext();
  const navigate = useNavigate();

  const handleSocialSignup = useCallback((provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/${provider}`;
  }, []);

  const handleSubmit = useCallback(async (formData) => {
    try {
      // Generate username from email
      const baseUsername = formData.email.split('@')[0].toLowerCase();
      const username = `${baseUsername}${Math.floor(Math.random() * 1000)}`;

      const userData = {
        fullname: formData.fullname,
        email: formData.email.toLowerCase(),
        password: formData.password,
        username: username,
      };

      const result = await register(userData);
      
      if (result.success) {
        // Show success message
        toast.success('Registration successful! Please verify your email.');
        
        // Auto-login the user with the returned tokens
        const { accessToken, user } = result.data.data;
        
        // Store token
        sessionStorage.setItem('accessToken', accessToken);
        authService.setAuthHeader(accessToken);
        
        // Navigate to email verification notice page
        setTimeout(() => {
          navigate('/verify-email-notice');
        }, 1000);
      } else {
        toast.error(result.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An unexpected error occurred');
    }
  }, [register, navigate]);

  return {
    handleSocialSignup,
    handleSubmit,
  };
}