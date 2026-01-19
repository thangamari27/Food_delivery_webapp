import { X, Edit2 } from "lucide-react";

function CustomerDetailModal({ content, customer, onClose, onEdit, styles }) {
  if (!customer) return null;

  const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }) : 'Never';

  return (
    <div className={styles.modal.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal.header}>
          <h2 className={styles.modal.title}>{content.viewModal.title}</h2>
          <button 
            onClick={onClose} 
            className={styles.button.icon}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className={styles.modal.body}>
          <div className="space-y-6">
            <section>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-400">
                {content.viewModal.sections.profile}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Customer Name</div>
                  <div className="font-medium">{customer.name}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Customer ID</div>
                  <div className="font-medium">{customer.id}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Email</div>
                  <div className="font-medium">{customer.email}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Phone</div>
                  <div className="font-medium">{customer.phone}</div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-400">
                {content.viewModal.sections.address}
              </h3>
              <div className="text-sm text-gray-700">
                <div>{customer.address}</div>
                <div>{customer.city}, {customer.state} - {customer.postal}</div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-400">
                {content.viewModal.sections.account}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Status</div>
                  <span className={`${styles.badge.base} ${customer.status === 'active' ? styles.badge.active : styles.badge.blocked}`}>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </span>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Registration Date</div>
                  <div className="font-medium">{formatDate(customer.created)}</div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-400">
                {content.viewModal.sections.activity}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Total Orders</div>
                  <div className="text-2xl font-bold text-gray-900">{customer.totalOrders}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Total Spend</div>
                  <div className="text-2xl font-bold text-gray-900">₹{customer.totalSpend.toLocaleString()}</div>
                </div>
                <div className="md:col-span-1 col-span-2">
                  <div className="text-xs text-gray-500 mb-1">Last Order</div>
                  <div className="text-sm font-medium">{formatDate(customer.lastOrder)}</div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className={styles.modal.footer}>
          <button onClick={onClose} className={styles.button.secondary}>Close</button>
          <button 
            onClick={() => { 
              onClose(); 
              onEdit(customer); 
            }} 
            className={styles.button.primary}
          >
            <Edit2 className="w-4 h-4" />
            {content.viewModal.editButton}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomerDetailModal