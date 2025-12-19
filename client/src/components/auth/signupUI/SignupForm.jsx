import { useAuth } from "@/hooks/useAuth";
import AuthButton from "@/components/common/authUi/AuthButton";
import SignupInputs from "./SignupInputs";

function SignupForm({
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
  } = useAuth({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submitForm = async () => {
    if (!validate(inputFields.signup)) return;

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Signup error:", error);
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
      <SignupInputs
        fields={inputFields.signup}
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        styles={styles.form}
      />

      <AuthButton
        onClick={submitForm}
        disabled={loading}
        styles={styles.button}
      >
        {loading
          ? "Creating account..."
          : content.signup.submitText}
      </AuthButton>
    </div>
  );
}

export default SignupForm;
