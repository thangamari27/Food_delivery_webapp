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

function EnquiryMobileCards({ content, enquiries, on_view, on_reply, on_resolve, on_delete, styles }) {
  const get_status_config = (status) => 
    content.statuses.find(s => s.value === status);
  
  const get_priority_config = (priority) => 
    content.priorities.find(p => p.value === priority);

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
    <div className={styles.mobile_card}>
      {enquiries.map(enquiry => {
        const status_config = get_status_config(enquiry.status);
        const priority_config = get_priority_config(enquiry.priority);
        const StatusIcon = statusIcons[enquiry.status];
        const purpose_config = content.purposes.find(p => p.value === enquiry.purpose);

        return (
          <div key={enquiry.id} className={styles.mobile_card_wrapper}>
            <div className={styles.mobile_card_header}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {enquiry.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{enquiry.name}</div>
                  <div className="text-xs text-gray-500">{enquiry.email}</div>
                </div>
              </div>
              {enquiry.priority === 'High' && (
                <span className={`w-3 h-3 rounded-full ${priority_config?.dot_color} animate-pulse`}></span>
              )}
            </div>
            <div className={styles.mobile_card_body}>
              <div className={styles.mobile_card_row}>
                <span className={styles.mobile_card_label}>Subject:</span>
                <span className={styles.mobile_card_value}>{enquiry.subject}</span>
              </div>
              <div className={styles.mobile_card_row}>
                <span className={styles.mobile_card_label}>ID:</span>
                <span className="text-xs text-gray-500">{enquiry.id}</span>
              </div>
              <div className={styles.mobile_card_row}>
                <span className={styles.mobile_card_label}>Purpose:</span>
                <span className="text-sm flex items-center gap-1.5">
                  {get_purpose_icon(enquiry.purpose)}
                  {purpose_config?.label}
                </span>
              </div>
              <div className={styles.mobile_card_row}>
                <span className={styles.mobile_card_label}>Status:</span>
                <span className={`${styles.status_badge} ${status_config?.color}`}>
                  <StatusIcon className={styles.status_icon} />
                  {enquiry.status}
                </span>
              </div>
              <div className={styles.mobile_card_row}>
                <span className={styles.mobile_card_label}>Priority:</span>
                <span className={`${styles.status_badge} ${priority_config?.color}`}>
                  {enquiry.priority}
                </span>
              </div>
              <div className={styles.mobile_card_row}>
                <span className={styles.mobile_card_label}>Date:</span>
                <span className="text-sm text-gray-600">
                  {new Date(enquiry.created_at).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
            <div className={styles.mobile_card_actions}>
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
          </div>
        );
      })}
    </div>
  );
}

export default EnquiryMobileCards;