import { X } from "lucide-react";

const ModalBase = ({ 
  isOpen, 
  onClose, 
  children, 
  size = "small", 
  showCloseButton = true,
  closeButtonPosition = "header",
  styles 
}) => {
  if (!isOpen) return null;

  const sizeClass = size === "large" ? styles.modalContentLarge : styles.modalContentSmall;
  
  // Custom class for header image positioning
  const headerCloseButtonClass = size === "large" 
    ? styles.modalOpen
    : styles.modalCloseButton;

  // Different body class based on modal size
  const bodyClass = size === "large" 
    ? "flex-1 min-h-0 overflow-y-auto"
    : `${styles.modalBody} ${styles.modalBodyScrollingMobile}`;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={`${styles.modalContent} ${sizeClass} ${size === "large" ? "flex flex-col" : ""}`} 
        onClick={(e) => e.stopPropagation()}
      >
        {closeButtonPosition === "header" && showCloseButton && (
          <div className={styles.modalHeader}>
            <div className="flex-1 min-w-0 relative">
              {children.header}
              {/* Overlay close button on header image */}
              {size === "large" && children.header && (
                <button 
                  onClick={onClose} 
                  className={headerCloseButtonClass}
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 hover:text-gray-900" />
                </button>
              )}
            </div>
            {/* Regular close button for small modals */}
            {size !== "large" && (
              <button 
                onClick={onClose} 
                className={styles.modalCloseButton} 
                aria-label="Close modal"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 hover:text-gray-700" />
              </button>
            )}
          </div>
        )}
        
        <div className={bodyClass}>
          {closeButtonPosition !== "header" && showCloseButton && (
            <button 
              onClick={onClose} 
              className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 bg-red backdrop-blur-sm p-1.5 sm:p-2 rounded-full hover:bg-white transition-colors z-20"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700" />
            </button>
          )}
          {children.body}
        </div>
      </div>
    </div>
  );
};

export default ModalBase;