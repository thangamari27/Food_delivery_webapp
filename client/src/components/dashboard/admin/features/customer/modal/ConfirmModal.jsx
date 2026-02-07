import { AlertTriangle } from "lucide-react";

function ConfirmModal({ content, type, customer, onConfirm, onClose, styles, loading = false }) {
  if (!customer) return null;

  const config = content.confirmModal[type];
  const canDelete = type !== 'delete' || customer.totalOrders === 0;

  return (
    <div className={styles.modal.overlay} onClick={loading ? undefined : onClose} role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{config.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{config.message}</p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="font-medium text-gray-900">{customer.name}</div>
              <div className="text-sm text-gray-600">{customer.email}</div>
            </div>
            {!canDelete && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">{config.warning}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className={styles.button.secondary} disabled={loading}>
            {config.cancel}
          </button>
          <button 
            onClick={onConfirm} 
            disabled={!canDelete || loading}
            className={styles.button.danger}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                {config.confirming || "Processing..."}
              </span>
            ) : (
              config.confirm
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal