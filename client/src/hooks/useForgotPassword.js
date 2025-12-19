import { useCallback } from "react";

export function useForgotPassword() {
  const handleSubmit = useCallback(async (email) => {
    console.log('Reset password for:', email);

  }, []);

  return {
    handleSubmit
  };
}