import { User, Package, Calendar } from 'lucide-react'

function DrawerUserActions({ content, onOpenProfile, onOpenOrders, onOpenBookings, onClose, styles }) {
  return (
     <div className={styles.section}>
        <h3 className={styles.title}>User Actions</h3>
        <ActionButton
        icon={User}
        text="My Profile"
        onClick={() => { onOpenProfile(); onClose(); }}
        styles={styles}
        />
        <ActionButton
        icon={Package}
        text="My Orders"
        onClick={() => { onOpenOrders(); onClose(); }}
        styles={styles}
        />
        <ActionButton
        icon={Calendar}
        text="Restaurant Bookings"
        onClick={() => { onOpenBookings(); onClose(); }}
        styles={styles}
        />
    </div>
  )
}

const ActionButton = ({ icon: Icon, text, onClick, styles }) => (
  <button onClick={onClick} className={styles.actionButton}>
    <Icon className={styles.actionIcon} />
    {text}
  </button>
);


export default DrawerUserActions