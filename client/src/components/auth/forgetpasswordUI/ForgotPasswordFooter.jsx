import AuthFooter from "@/components/common/authUi/AuthFooter"

function ForgotPasswordFooter({ content, onNavigate, styles }) {
  return (
     <AuthFooter
      text={content.forgotPassword.footerText}
      linkText={content.forgotPassword.footerLink}
      onLinkClick={() => onNavigate('login')}
      styles={styles.footer}
    />
  )
}

export default ForgotPasswordFooter