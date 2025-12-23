import { X } from 'lucide-react';

function DrawerHeader({ content, onClose, styles }) {
  return (
    <div className={styles.container}>
        <span className={styles.title}>Menu</span>
        <button onClick={onClose} className={styles.closeBtn}>
        <X className={styles.closeIcon} />
        </button>
    </div>
  )
}

export default DrawerHeader