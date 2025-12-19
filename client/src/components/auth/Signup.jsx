import SignupHeader from "./signupUI/SignupHeader";
import SignupSocial from "./signupUI/SignupSocial";
import SignupForm from "./signupUI/SignupForm";
import SignupFooter from "./signupUI/SignupFooter";
import { useSignup } from "@/hooks/useSignup";

function Signup({
  content,
  inputFields,
  authSocialProvider,
  onNavigate,
  styles,
}) {
  const { handleSocialSignup, handleSubmit } = useSignup();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <SignupHeader content={content} styles={styles} />

        <SignupSocial
          authSocialProvider={authSocialProvider}
          onSocialLogin={handleSocialSignup}
          styles={styles}
        />

        <SignupForm
          inputFields={inputFields}
          content={content}
          styles={styles}
          onSubmit={handleSubmit}
        />

        <SignupFooter
          content={content}
          onNavigate={onNavigate}
          styles={styles}
        />
      </div>
    </div>
  );
}

export default Signup;
