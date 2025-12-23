import React from 'react'

function DrawerContainer({ isOpen, children, styles }) {
  return (
    <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : styles.drawerClosed}`}>
        <div className="h-full flex flex-col">
        {children}
        </div>
    </div>
  )
}

export default DrawerContainer