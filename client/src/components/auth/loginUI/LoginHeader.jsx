import AuthHeader from "@/components/common/authUi/AuthHeader";

function LoginHeader({ content, styles }) {
  return (
    <AuthHeader 
      title={content.login.title}
      subtitle={content.login.subtitle}
      styles={styles.header}
    />
  );
}

export default LoginHeader;