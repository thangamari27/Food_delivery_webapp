import { Link } from "react-router-dom"

function NavLink({ link, onClick, styles }) {
  return (
    <Link
      to={link.path}
      onClick={onClick}
      className={styles.link}
    >
      {link.name}
      <span className={styles.text} />
    </Link>
  )
}

export default NavLink
