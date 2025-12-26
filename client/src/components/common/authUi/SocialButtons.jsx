import AuthButton from "./AuthButton"
import  Image from '../Image'

function SocialButtons({ authSocialProvider, onSocialLogin, styles }) {
  return (
    <div className={styles.container}>
      {authSocialProvider.map((provider) => (
        <AuthButton
          key={provider.id}
          variant="social"
          onClick={() => onSocialLogin(provider.id)}
          styles={styles.button}
        >
          {/* <span className={styles.image}>{provider.icon}</span> */}
          <Image 
            src={provider.src}
            srcFallback={provider.srcFallback}
            alt={provider.alt}
            pictureStyle={styles.picture}
            imageStyle={styles.image}
          />
          <span className={styles.label}> {provider.label}</span>
        </AuthButton>
      ))}
    </div>
  )
}

export default SocialButtons