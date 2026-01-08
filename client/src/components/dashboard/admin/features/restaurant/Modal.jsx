import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

function Modal({ isOpen, onClose, title, children, footer, styles }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modals.overlay}>
      <div ref={modalRef} className={styles.modals.content}>
        <div className={styles.modals.header}>
          <h2 className={styles.headerTitle}>{title}</h2>
          <button onClick={onClose} className={styles.modals.closeBtn}>
            <X className={styles.closeIcon}  />
          </button>
        </div>
        <div className={styles.modals.body}>{children}</div>
        {footer && <div className={styles.modals.footer}>{footer}</div>}
      </div>
    </div>
  )
}

export default Modal