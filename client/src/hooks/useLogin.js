import { useState, useCallback } from "react";

export function useLogin() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSocialLogin = useCallback((provider) => {
    console.log("Social login:", provider);
    // social auth logic
  }, []);

  const handleSubmit = useCallback(async (formData, rememberMe) => {
    console.log("Login submit:", formData, rememberMe);
    // API call here
  }, []);

  return {
    rememberMe,
    setRememberMe,
    handleSocialLogin,
    handleSubmit,
  };
}
