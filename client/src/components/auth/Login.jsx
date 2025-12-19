import LoginHeader from "./loginUI/LoginHeader";
import LoginSocial from "./loginUI/LoginSocial";
import LoginForm from "./loginUI/LoginForm";
import LoginFooter from "./loginUI/LoginFooter";
import { useLogin } from "@/hooks/useLogin";

function Login({
  content,
  inputFields,
  authSocialProvider,
  onNavigate,
  styles,
}) {
  const {
    rememberMe,
    setRememberMe,
    handleSocialLogin,
    handleSubmit,
  } = useLogin();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <LoginHeader content={content} styles={styles} />

        <LoginSocial
          authSocialProvider={authSocialProvider}
          onSocialLogin={handleSocialLogin}
          styles={styles}
        />

        <LoginForm
          content={content}
          inputFields={inputFields}
          styles={styles}
          onNavigate={onNavigate}
          onSubmit={handleSubmit}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
        />

        <LoginFooter
          content={content}
          onNavigate={onNavigate}
          styles={styles}
        />
      </div>
    </div>
  );
}

export default Login;
