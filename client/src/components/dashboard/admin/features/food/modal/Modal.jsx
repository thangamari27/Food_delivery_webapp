import { X } from 'lucide-react';
import { useEscapeKey, useClickOutside } from "../../../../../../hooks/admin/useFoodManagement"

function Modal({ isOpen, onClose, title, children, footer, styles }) {
  const modalRef = useClickOutside(onClose);
  useEscapeKey(onClose);
  
  if (!isOpen) return null;
  
  return (
    <div className={styles.modal.overlay}>
      <div ref={modalRef} className={styles.modal.container}>
        <div className={styles.modal.header}>
          <h2 className={styles.modal.title}>{title}</h2>
          <button onClick={onClose} className={styles.buttons.ghost}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.modal.body}>{children}</div>
        {footer && <div className={styles.modal.footer}>{footer}</div>}
      </div>
    </div>
  )
}

export default Modal