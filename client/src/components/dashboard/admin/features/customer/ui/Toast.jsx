import { UserCheck, AlertTriangle } from "lucide-react";

function Toast({ content, message, type, styles }) {
  if (!message) return null;
  
  const Icon = type === 'success' ? UserCheck : AlertTriangle;
  
  return (
    <div className={styles.toast.container}>
      <div className={type === 'success' ? styles.toast.success : styles.toast.error}>
        <Icon className="w-4 h-4" />
        {message}
      </div>
    </div>
  )
}

export default Toast