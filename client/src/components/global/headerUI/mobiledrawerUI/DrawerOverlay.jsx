import React from 'react'

function DrawerOverlay({ isOpen, onClose, styles }) {
  if (!isOpen) return null;
  return <div className={styles.overlay} onClick={onClose} />;
}

export default DrawerOverlay