import { useState, useCallback } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSocialLogin = useCallback((provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/${provider}`;
  }, []);

  const handleSubmit = useCallback(async (formData, rememberMe) => {
    try {
      const loginData = {
        identifier: formData.email,
        password: formData.password,
        rememberMe
      };

      const result = await login(loginData);
      
      if (result.success) {
        toast.success('Login successful!');
        
        // Navigate based on user role
        const userRole = result.user.role;
        if (userRole === 'admin') {
          navigate('/admin');
        } else if (userRole === 'customer') {
          navigate('/user');
        } else {
          navigate('/');
        }
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred');
    }
  }, [login, navigate]);

  return {
    rememberMe,
    setRememberMe,
    handleSocialLogin,
    handleSubmit,
  };
}