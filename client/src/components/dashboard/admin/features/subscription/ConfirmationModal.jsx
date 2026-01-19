import { useEffect, useCallback } from 'react'

function ConfirmationModal({
  content,
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  type = 'danger',
  styles
}) {
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onCancel]);

  const handleBackdropClick = useCallback((event) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  }, [onCancel]);

  if (!isOpen) return null;

  return (
    <div 
      className={styles.modal.backdrop}
      onClick={handleBackdropClick}
    >
      <div className={styles.modal.confirmation}>
        <h3 className={styles.typography.heading_2}>{title}</h3>
        <p className={`${styles.typography.body} mb-6`}>{message}</p>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className={styles.button.secondary}
          >
            {content.confirmation.buttons.cancel}
          </button>
          <button
            onClick={onConfirm}
            className={type === 'danger' 
              ? styles.button.danger 
              : styles.button.primary
            }
          >
            {content.confirmation.buttons.confirm}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal