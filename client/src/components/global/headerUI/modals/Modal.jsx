import Title from '@/components/common/Title'
import { X } from 'lucide-react';

function Modal({ isOpen, onClose, title, children, size = "md", styles }) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl"
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.closeBtn}
        onClick={onClose}
      />
      <div className={`${sizeClasses[size]} ${styles.wrapper}`}>
        <div className={styles.header}>
          <Title title={title} titleStyle={styles.title} />
          <button
            onClick={onClose}
            className={styles.headerBtn}
            aria-label="Close modal"
          >
            <X className={styles.closeIcon} />
          </button>
        </div>
        <div className={styles.contentContainer}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal