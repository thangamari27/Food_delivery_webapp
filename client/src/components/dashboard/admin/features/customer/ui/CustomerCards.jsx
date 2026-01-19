import { Shield, Edit2, Trash2 } from "lucide-react";

function CustomerCards({ content, customers, onView, onEdit, onToggleStatus, onDelete, styles }) {
  const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-IN') : 'Never';
  const getBadgeStyle = (status) => {
    const statusStyles = {
      active: styles.badge.active,
      blocked: styles.badge.blocked,
      inactive: styles.badge.inactive
    };
    return `${styles.badge.base} ${statusStyles[status] || styles.badge.inactive}`;
  };

  return (
    <div className={styles.card.container}>
      {customers.map((customer) => (
        <div 
          key={customer.id} 
          className={styles.card.card} 
          onClick={() => onView(customer)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onView(customer)}
        >
          <div className={styles.card.header}>
            <div>
              <div className={styles.card.name}>{customer.name}</div>
              <div className={styles.card.id}>{customer.id}</div>
            </div>
            <span className={getBadgeStyle(customer.status)}>
              {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
            </span>
          </div>
          <div className={styles.card.grid}>
            <div>
              <div className={styles.card.label}>Phone</div>
              <div className={styles.card.value}>{customer.phone}</div>
            </div>
            <div>
              <div className={styles.card.label}>Orders</div>
              <div className={styles.card.value}>{customer.totalOrders}</div>
            </div>
            <div>
              <div className={styles.card.label}>Email</div>
              <div className={styles.card.value}>{customer.email}</div>
            </div>
            <div>
              <div className={styles.card.label}>Registered</div>
              <div className={styles.card.value}>{formatDate(customer.created)}</div>
            </div>
          </div>
          <div className={styles.card.footer} onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-4">
                <button 
                onClick={() => onEdit(customer)} 
                className={styles.button.secondary + ' text-sm py-1.5 flex items-center gap-1'}
                >
                <Edit2 className="w-3 h-3" />
                Edit
                </button>
                <button 
                onClick={() => onToggleStatus(customer)} 
                className={styles.button.secondary + ' text-sm py-1.5 flex items-center gap-1'}
                >
                <Shield className="w-3 h-3" />
                {customer.status === 'active' ? 'Block' : 'Unblock'}
                </button>
            </div>
            <button 
              onClick={() => onDelete(customer)} 
              className={styles.button.iconDanger}
              aria-label={`Delete ${customer.name}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CustomerCards