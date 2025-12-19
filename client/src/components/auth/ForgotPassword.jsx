import ForgotPasswordHeader from "./forgetpasswordUI/ForgotPasswordHeader";
import ForgotPasswordForm from "./forgetpasswordUI/ForgotPasswordForm";
import ForgotPasswordFooter from "./forgetpasswordUI/ForgotPasswordFooter";
import { useForgotPassword } from "@/hooks/useForgotPassword";

function ForgotPassword({
  content,
  inputFields,
  onNavigate,
  styles,
}) {
  const { handleSubmit } = useForgotPassword();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <ForgotPasswordHeader
          content={content}
          styles={styles}
        />

        <ForgotPasswordForm
          inputFields={inputFields}
          content={content}
          styles={styles}
          onSubmit={handleSubmit}
        />

        <ForgotPasswordFooter
          content={content}
          onNavigate={onNavigate}
          styles={styles}
        />
      </div>
    </div>
  );
}

export default ForgotPassword;