import AuthHeader from "@/components/common/authUi/AuthHeader"

function ForgotPasswordHeader({ content, styles }) {
  return (
    <AuthHeader 
      title={content.forgotPassword.title} 
      subtitle={content.forgotPassword.subtitle} 
      styles={styles.header}
    />
  )
}

export default ForgotPasswordHeader