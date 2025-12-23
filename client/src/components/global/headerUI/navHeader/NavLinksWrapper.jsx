import NavLink from '../NavLink'

function NavLinksWrapper({ navLinks, styles }) {
  return (
    <div className={styles.navLinkContainer}>
      {navLinks.map(link => (
        <NavLink key={link.id} link={link} styles={styles} />
      ))}
    </div>
  )
}

export default NavLinksWrapper