import React from 'react'

function NavLink({ link, onClick, styles }) {
  return (
    <a
        href={link.path}
        onClick={onClick}
        className={styles.link}
    >
        {link.name}
        <span className={styles.text} />
    </a>
  )
}

export default NavLink