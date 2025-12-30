import { Link } from "react-router-dom"

function Logo({ isLoggedIn, content, styles }) {
  return (
    <Link 
      to={content.path} 
      className={styles.container}
    >
        <span className={`${styles.logo} ${isLoggedIn ? 'scale-110' : ''}`}>
            {content.logo}
        </span>
        <span className={styles.title}>
            {content.name}
        </span>
    </Link>
  )
}

export default Logo