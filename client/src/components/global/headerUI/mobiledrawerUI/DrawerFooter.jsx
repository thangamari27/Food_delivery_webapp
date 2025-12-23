import { LogOut } from 'lucide-react';

function DrawerFooter({ onLogout, styles }) {
  return (
    <div className={styles.container}>
        <button onClick={onLogout} className={styles.logoutBtn}>
            <LogOut className={styles.logoutIcon} />
            Logout
        </button>
    </div>
  )
}

export default DrawerFooter