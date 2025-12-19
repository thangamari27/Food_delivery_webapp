import { useCallback } from "react";

export function useSignup() {
  const handleSocialSignup = useCallback((provider) => {
    console.log("Social signup:", provider);
    // social signup logic
  }, []);

  const handleSubmit = useCallback(async (formData) => {
    console.log("Signup submit:", formData);
    // API call here
  }, []);

  return {
    handleSocialSignup,
    handleSubmit,
  };
}
