import { useState } from "react";

export const useAuth = (initialValues = {}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = (fields) => {
    const newErrors = {};

    fields.forEach((field) => {
      const value = formData[field.name];

      if (!value?.trim()) {
        newErrors[field.name] =
          `${field.label || field.placeholder} is required`;
      } else if (
        field.type === "email" &&
        !validateEmail(value)
      ) {
        newErrors[field.name] = "Invalid email address";
      }
    });

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    loading,
    setLoading,
    handleChange,
    validate,
  };
};
