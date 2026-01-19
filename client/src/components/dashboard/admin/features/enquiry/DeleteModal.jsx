import { AlertCircle } from 'lucide-react';

function DeleteModal({ content, enquiry, on_close, on_confirm, styles }) {
  if (!enquiry) return null;

  return (
    <div className={styles.modal_overlay} onClick={on_close}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
            {content.modal_content.delete.title}
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            {content.modal_content.delete.message}
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-gray-900 mb-1">{enquiry.subject}</p>
            <p className="text-xs text-gray-500">{enquiry.id}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={on_close} className={styles.button_secondary}>
              {content.modal_content.delete.cancel_button}
            </button>
            <button 
              onClick={() => { on_confirm(enquiry.id); on_close(); }} 
              className={styles.button_danger}
            >
              {content.modal_content.delete.confirm_button}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal