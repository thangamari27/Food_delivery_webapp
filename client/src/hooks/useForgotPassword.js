import { useCallback } from 'react';
import { authService } from '@/services/authService';
import { toast } from 'react-hot-toast';

export function useForgotPassword() {
  const handleSubmit = useCallback(async (formData) => {
    try {
      const response = await authService.forgotPassword(formData.email);
      
      // Backend returns: { success, data, message }
      toast.success(response.data.message || 'Password reset email sent!');
      return { success: true };
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error(error.response?.data?.message || 'Failed to send reset email');
      return { success: false };
    }
  }, []);

  return {
    handleSubmit
  };
}