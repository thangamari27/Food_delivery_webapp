import { useState } from "react";
import LoginInputs from "./LoginInputs";
import LoginActions from "./LoginActions";
import { useAuth } from "@/hooks/useAuth";
function LoginForm({
  content,
  inputFields,
  styles,
  onNavigate,
  onSubmit,
  rememberMe,
  setRememberMe,
}) {
  const {
    formData,
    errors,
    handleChange,
    validate,
  } = useAuth({ email: "", password: "" });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (e) => {
    e?.preventDefault?.();
    
    // Prevent double submission
    if (isSubmitting) return;

    // Validate form
    if (!validate(inputFields.login)) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData, rememberMe);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      // Reset after a short delay to prevent rapid re-clicks
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") submitForm(e);
  };

  return (
    <form 
      onSubmit={submitForm}
      className={styles.form.container}
      onKeyDown={handleKeyPress}
    >
      <LoginInputs
        fields={inputFields.login}
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        styles={styles.form}
        isSubmitting={isSubmitting}
      />

      <LoginActions
        content={content.login}
        rememberMe={rememberMe}
        setRememberMe={setRememberMe}
        onNavigate={onNavigate}
        handleSubmit={submitForm}
        loading={isSubmitting}
        styles={styles}
        isSubmitting={isSubmitting}
      />
    </form>
  );
}

export default LoginForm;