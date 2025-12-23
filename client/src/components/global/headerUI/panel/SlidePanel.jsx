import Title from '@/components/common/Title'
import { X } from 'lucide-react'

function SlidePanel({ isOpen, onClose, title, children, footer, styles }) {
  return (
    <>
    {isOpen && (
      <div
        className={styles.isClosePanel}
        onClick={onClose}
      />
    )}
    <div
      className={`${styles.isOpenPanel} ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Title title={title} titleStyle={styles.title} />
          <button
            onClick={onClose}
            className={styles.btn}
            aria-label="Close panel"
          >
            <X className={styles.closeIcon} />
          </button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
        {footer && (
          <div className={styles.panelFooter}>
            {footer}
          </div>
        )}
      </div>
    </div>
  </>
  )
}

export default SlidePanel