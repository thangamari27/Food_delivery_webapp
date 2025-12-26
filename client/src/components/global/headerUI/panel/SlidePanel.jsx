import Title from '@/components/common/Title';
import { X, ArrowLeft } from 'lucide-react';

function SlidePanel({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer, 
  styles,
  showBackButton = false,
  onBack = null
}) {
  const handleBackClick = (e) => {
    e.stopPropagation();
    if (onBack) onBack();
  };

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
          {/* Header */}
          <div className={styles.wrapper}>
            <div className="flex items-center gap-2">
              {showBackButton && onBack && (
                <button
                  onClick={handleBackClick}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
              )}
              <Title title={title} titleStyle={styles.title} />
            </div>
            
            <button
              onClick={onClose}
              className={styles.btn}
              aria-label="Close panel"
            >
              <X className={styles.closeIcon} />
            </button>
          </div>

          {/* Content */}
          <div className={styles.content}>
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className={styles.panelFooter}>
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SlidePanel;