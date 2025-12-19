import SocialButtons from "@/components/common/authUi/SocialButtons"
import AuthDivider from "@/components/common/authUi/AuthDivider"

function SignupSocial({ 
  authSocialProvider, 
  onSocialLogin, 
  styles 
}) {
  return (
    <>
      <SocialButtons 
        authSocialProvider={authSocialProvider} 
        onSocialLogin={onSocialLogin} 
        styles={styles.socialButton} 
      />
      <AuthDivider 
        text="or sign up with email" 
        styles={styles.divider}
      />
    </>
  )
}

export default SignupSocial