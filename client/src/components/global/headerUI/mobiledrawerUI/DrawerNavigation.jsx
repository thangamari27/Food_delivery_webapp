import IconComponent from '../../../common/IconComponent'

function DrawerNavigation({ navLinks, onClose, styles }) {
  return (
    <div className={styles.section}>
        <h3 className={styles.title}>Navigation</h3>
        {navLinks.map(link => (
        <NavLinkItem key={link.id} link={link} onClose={onClose} styles={styles} />
        ))}
    </div>
  )
}

const NavLinkItem = ({ link, onClose, styles }) => (
  <a
    href={link.path}
    onClick={onClose}
    className={styles.navLink}
  >
    <IconComponent Icon={link.icon} className="w-4 h-4 inline-block mr-2" />
    <span>{link.name}</span>
  </a>
);

export default DrawerNavigation