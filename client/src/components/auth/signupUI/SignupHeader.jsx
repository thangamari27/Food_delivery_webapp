import AuthHeader from "@/components/common/authUi/AuthHeader"

function SignupHeader({ content, styles }) {
  return (
    <AuthHeader 
      title={content.signup.title} 
      subtitle={content.signup.subtitle} 
      styles={styles.header}
    />
  )
}

export default SignupHeader