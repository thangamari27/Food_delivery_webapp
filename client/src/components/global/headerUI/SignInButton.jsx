import { Link } from "react-router-dom"
import IconComponent from '@/components/common/IconComponent'

function SignInButton({ content, styles }) {
  return (
    <Link to={content.path} className={styles.btn}>
        <IconComponent Icon={content.icon} className={styles.icon} />
        <span className={styles.text}>
            {content.text}
        </span>
    </Link>
  )
}

export default SignInButton