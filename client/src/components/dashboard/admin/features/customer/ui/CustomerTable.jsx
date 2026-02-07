import { Shield, Edit2, Trash2 } from "lucide-react";

function CustomerTable({ content, customers, onView, onEdit, onToggleStatus, onDelete, styles }) {
  const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-IN') : 'Never';
  const getBadgeStyle = (status) => {
    const statusStyles = {
      active: styles.badge.active,
      blocked: styles.badge.blocked,
      inactive: styles.badge.inactive
    };
    return `${styles.badge.base} ${statusStyles[status] || styles.badge.inactive}`;
  };
  
  const handleEdit = (customer, e) => {
    e?.stopPropagation(); // Prevent event bubbling
    onEdit(customer);
  };

  return (
    <div className={styles.table.container}>
      <div className={styles.table.wrapper}>
        <div className={styles.table.scroll}>
          <table className={styles.table.table}>
            <thead className={styles.table.thead}>
              <tr>
                {content.table.columns.map((col, i) => (
                  <th key={i} className={styles.table.th}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className={styles.table.tbody}>
              {customers.map((customer) => (
                <tr 
                  key={customer.id} 
                  className={styles.table.tr} 
                  onClick={() => onView(customer)}
                  role="row"
                >
                  <td className={styles.table.td}>
                    <div className={styles.table.tdName}>{customer.name}</div>
                    <div className={styles.table.tdId}>{customer.id}</div>
                  </td>
                  <td className={`${styles.table.td} ${styles.table.tdEmail}`}>{customer.email}</td>
                  <td className={styles.table.td}>{customer.phone}</td>
                  <td className={styles.table.td}>{customer.totalOrders}</td>
                  <td className={styles.table.td}>
                    <span className={getBadgeStyle(customer.status)}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </td>
                  <td className={styles.table.td}>{formatDate(customer.created)}</td>
                  <td className={styles.table.td} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.table.actions}>
                      <button 
                        onClick={(e) => handleEdit(customer, e)} 
                        className={styles.button.icon} 
                        title={content.table.actions.edit}
                        aria-label={`Edit ${customer.name}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onToggleStatus(customer)} 
                        className={styles.button.icon} 
                        title={customer.status === 'active' ? content.table.actions.block : content.table.actions.unblock}
                        aria-label={`${customer.status === 'active' ? 'Block' : 'Unblock'} ${customer.name}`}
                      >
                        <Shield className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDelete(customer)} 
                        className={styles.button.iconDanger} 
                        title={content.table.actions.delete}
                        aria-label={`Delete ${customer.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CustomerTable