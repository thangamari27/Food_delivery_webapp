import AuthFooter from "@/components/common/authUi/AuthFooter"

function SignupFooter({ content, onNavigate, styles }) {
  return (
    <AuthFooter
      text={content.signup.footerText}
      linkText={content.signup.footerLink}
      onLinkClick={() => onNavigate('login')}
      styles={styles.footer}
    />
  )
}

export default SignupFooter