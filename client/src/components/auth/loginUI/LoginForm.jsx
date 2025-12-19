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
    loading,
    setLoading,
    handleChange,
    validate,
  } = useAuth({ email: "", password: "" });

  const submitForm = async () => {
    if (!validate(inputFields.login)) return;

    setLoading(true);
    try {
      await onSubmit(formData, rememberMe);
    } catch (error) {
      console.error("Login error:", error);
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
      <LoginInputs
        fields={inputFields.login}
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        styles={styles.form}
      />

      <LoginActions
        content={content.login}
        rememberMe={rememberMe}
        setRememberMe={setRememberMe}
        onNavigate={onNavigate}
        handleSubmit={submitForm}
        loading={loading}
        styles={styles}
      />
    </div>
  );
}

export default LoginForm;
