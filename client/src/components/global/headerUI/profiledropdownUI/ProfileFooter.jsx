import { LogOut } from "lucide-react"

function ProfileFooter({ content, onLogout, styles }) {
  return (
     <div className={styles.container}>
        <button onClick={onLogout} className={styles.logoutBtn}>
        <LogOut className={styles.logoutIcon} />
        <span className={styles.logoutText}>Logout</span>
        </button>
    </div>
  )
}

export default ProfileFooter