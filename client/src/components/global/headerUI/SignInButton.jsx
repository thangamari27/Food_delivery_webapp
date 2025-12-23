import IconComponent from '@/components/common/IconComponent'

function SignInButton({ content, styles }) {
  return (
    <a href={content.path} className={styles.btn}>
        <IconComponent Icon={content.icon} className={styles.icon} />
        <span className={styles.text}>
            {content.text}
        </span>
    </a>
  )
}

export default SignInButton