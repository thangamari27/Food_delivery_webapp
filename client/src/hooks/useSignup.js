import { useCallback } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useSignup() {
  const { register } = useAuthContext();
  const navigate = useNavigate();

  const handleSocialSignup = useCallback((provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/${provider}`;
  }, []);

  const handleSubmit = useCallback(async (formData) => {
    try {
      // Generate username from email (before @ symbol) + random number
      const baseUsername = formData.email.split('@')[0].toLowerCase();
      const username = `${baseUsername}${Math.floor(Math.random() * 1000)}`;

      const userData = {
        fullname: formData.fullname,
        email: formData.email.toLowerCase(),
        password: formData.password,
        username: username,
        // role is optional, defaults to 'customer' in backend
      };

      const result = await register(userData);
      
      if (result.success) {
        toast.success('Registration successful! Please check your email for verification.');
        // Redirect to login page
        setTimeout(() => {
          navigate('/login');
        }, 2000);
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