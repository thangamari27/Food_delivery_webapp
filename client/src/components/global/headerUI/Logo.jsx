
function Logo({ isLoggedIn, content, styles }) {
  return (
    <a href={content.path} className={styles.container}>
        <span className={`${styles.logo} ${isLoggedIn ? 'scale-110' : ''}`}>
            {content.logo}
        </span>
        <span className={styles.title}>
            {content.name}
        </span>
    </a>
  )
}

export default Logo