import React from 'react'

function Badge({ type, children, className = '', styles }) {
  return (
    <span className={`${styles.badges.base} ${styles.badges[type]?.[children] || ''} ${className}`}>
        {children}
    </span>
  )
}

export default Badge