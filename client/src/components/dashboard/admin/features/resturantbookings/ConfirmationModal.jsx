import React from 'react'

function ConfirmationModal({ content, isOpen, title, message, actionType, onConfirm, onCancel, styles }) {
  if (!isOpen) return null;

  const colors = styles.modal_colors[actionType] || styles.modal_colors.confirm;

  return (
    <div className={styles.layout.modal_overlay}>
      <div className={styles.layout.modal_container}>
        <h3 className={styles.text.heading.h3 + ' mb-2'}>
          {title}
        </h3>
        <p className={styles.text.body.small + ' text-gray-600 mb-6'}>
          {message}
        </p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className={styles.buttons.secondary}>
            {content.modal_content.cancel_button}
          </button>
          <button 
            onClick={onConfirm}
            className={`px-4 py-2 ${colors.bg} text-white rounded-lg ${colors.hover} transition-colors font-medium text-sm`}
          >
            {content.modal_content.confirm_button}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal