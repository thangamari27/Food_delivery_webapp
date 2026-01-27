import { useCallback } from 'react';
import { authService } from '@/services/authService';
import { toast } from 'react-hot-toast';

export function useForgotPassword() {
  const handleSubmit = useCallback(async (email) => {
    // Changed parameter from formData to email
    try {
      const response = await authService.forgotPassword(email);
      console.log(response);
      
      // Backend returns: { success, data, message }
      const message = response.data?.message || 'Password reset email sent!';
      toast.success(message);
      
      return { 
        success: true,
        message: message
      };
    } catch (error) {
      console.error('Forgot password error:', error);
      
      const errorMessage = error.response?.data?.message || 
        error.message || 
        'Failed to send reset email';

      toast.error(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  }, []);

  return {
    handleSubmit
  };
}