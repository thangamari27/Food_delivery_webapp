import { useAuth } from "@/hooks/useAuth";
import AuthButton from "@/components/common/authUi/AuthButton";
import ForgotPasswordInput from "./ForgotPasswordInput";

function ForgotPasswordForm({
  inputFields,
  content,
  styles,
  onSubmit,
}) {
  const {
    formData,
    errors,
    loading,
    setLoading,
    handleChange,
    validate,
  } = useAuth({ email: "" });

  const submitForm = async () => {
    if (!validate(inputFields.forgotPassword)) return;

    setLoading(true);
    try {
      await onSubmit(formData.email);
    } catch (error) {
      console.error("Reset password error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") submitForm();
  };

  return (
    <div
      className={styles.form.container}
      onKeyDown={handleKeyPress}
    >
      <ForgotPasswordInput
        field={inputFields.forgotPassword[0]}
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        styles={styles.form}
      />

      <AuthButton
        onClick={submitForm}
        disabled={loading}
        styles={styles.button}
      >
        {loading
          ? "Sending..."
          : content.forgotPassword.submitText}
      </AuthButton>
    </div>
  );
}

export default ForgotPasswordForm;
