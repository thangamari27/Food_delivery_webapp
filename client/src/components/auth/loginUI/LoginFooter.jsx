import AuthFooter from "@/components/common/authUi/AuthFooter";

function LoginFooter({ content, onNavigate, styles }) {
  return (
    <AuthFooter
      text={content.login.footerText}
      linkText={content.login.footerLink}
      onLinkClick={() => onNavigate('signup')}
      styles={styles.footer}
    />
  );
}

export default LoginFooter;