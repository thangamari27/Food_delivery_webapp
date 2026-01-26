import { useEffect, useState } from 'react';
import { authService } from '@/services/authService';

export function useVerifyEmail({ token, updateUser, navigate }) {
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link');
      return;
    }
    verify(token);
  }, [token]);

  const verify = async (token) => {
    try {
      // Call verify email API
      const res = await authService.verifyEmail(token);

      setStatus('success');
      setMessage(res.data.message || 'Email verified successfully!');

      // Update user profile
      try {
        const profile = await authService.getProfile();
        updateUser(profile.data.data);
      } catch (profileError) {
        console.error('Failed to fetch profile:', profileError);
      }

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/user');
      }, 3000);

    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Verification failed');
      
      // Redirect to login after 5 seconds on error
      setTimeout(() => {
        navigate('/login');
      }, 5000);
    }
  };

  return { status, message };
}