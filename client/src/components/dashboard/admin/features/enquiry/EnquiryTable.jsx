import { 
  Eye, 
  MessageSquare, 
  CheckCircle, 
  Trash2, 
  AlertCircle, 
  Clock, 
  XCircle 
} from 'lucide-react';

const statusIcons = {
  'New': AlertCircle,
  'In Progress': Clock,
  'Resolved': CheckCircle,
  'Closed': XCircle
};

function EnquiryTable({ content, enquiries, on_view, on_reply, on_resolve, on_delete, styles }) {
  const get_status_badge = (status) => {
    const config = content.statuses.find(s => s.value === status);
    const Icon = statusIcons[status];
    
    return (
      <span className={`${styles.status_badge} ${config?.color}`}>
        <Icon className={styles.status_icon} />
        {status}
      </span>
    );
  };

  const get_priority_badge = (priority) => {
    const config = content.priorities.find(p => p.value === priority);
    return (
      <span className={`${styles.status_badge} ${config?.color}`}>
        {priority === 'High' && (
          <span className={`w-2 h-2 rounded-full ${config?.dot_color} animate-pulse`}></span>
        )}
        {priority}
      </span>
    );
  };

  const get_purpose_icon = (purpose_value) => {
    const purpose_config = content.purposes.find(p => p.value === purpose_value);
    if (!purpose_config) return null;
    
    const Icon = purpose_config.icon;
    return (
      <Icon 
        className={`${purpose_config.icon_size} ${purpose_config.icon_color} inline mr-1.5`} 
        aria-label={purpose_config.label}
      />
    );
  };

  return (
    <div className={styles.table_card}>
      <div className={styles.table_wrapper}>
        <table className={styles.table}>
          <thead className={styles.table_head}>
            <tr>
              {content.table_headers.map(header => (
                <th key={header.id} className={styles.table_header_cell}>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {enquiries.map(enquiry => {
              const purpose_config = content.purposes.find(p => p.value === enquiry.purpose);
              
              return (
                <tr 
                  key={enquiry.id} 
                  className={enquiry.status === 'New' 
                    ? styles.table_row_highlight 
                    : styles.table_row
                  }
                >
                  <td className={styles.table_cell}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {enquiry.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{enquiry.name}</div>
                        <div className="text-xs text-gray-500">{enquiry.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.table_cell}>
                    <div className="font-medium text-gray-900 max-w-xs truncate">
                      {enquiry.subject}
                    </div>
                    <div className="text-xs text-gray-500">{enquiry.id}</div>
                  </td>
                  <td className={styles.table_cell}>
                    <div className="flex items-center gap-1.5">
                      {get_purpose_icon(enquiry.purpose)}
                      <span>{purpose_config?.label}</span>
                    </div>
                  </td>
                  <td className={styles.table_cell}>
                    {get_priority_badge(enquiry.priority)}
                  </td>
                  <td className={styles.table_cell}>
                    {get_status_badge(enquiry.status)}
                  </td>
                  <td className={styles.table_cell}>
                    {new Date(enquiry.created_at).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className={styles.table_cell}>
                    <div className={styles.action_icons}>
                      <button 
                        onClick={() => on_view(enquiry)} 
                        className={`${styles.icon_button} ${styles.icon_button_view}`}
                        title={content.action_labels?.view || 'View'}
                      >
                        <Eye className={styles.action_icon} />
                      </button>
                      <button 
                        onClick={() => on_reply(enquiry)} 
                        className={`${styles.icon_button} ${styles.icon_button_edit}`}
                        title={content.action_labels?.reply || 'Reply'}
                      >
                        <MessageSquare className={styles.action_icon} />
                      </button>
                      {enquiry.status !== 'Resolved' && (
                        <button 
                          onClick={() => on_resolve(enquiry.id)} 
                          className={`${styles.icon_button} ${styles.icon_button_resolve}`}
                          title={content.action_labels?.resolve || 'Resolve'}
                        >
                          <CheckCircle className={styles.action_icon} />
                        </button>
                      )}
                      <button 
                        onClick={() => on_delete(enquiry)} 
                        className={`${styles.icon_button} ${styles.icon_button_delete}`}
                        title={content.action_labels?.delete || 'Delete'}
                      >
                        <Trash2 className={styles.action_icon} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EnquiryTable;