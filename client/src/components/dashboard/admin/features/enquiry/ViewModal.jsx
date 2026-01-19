import { Eye, X, User, Tag, MessageSquare } from 'lucide-react';

function ViewModal({ content, enquiry, on_close, on_status_change, on_priority_change, styles }) {
  if (!enquiry) return null;
  const purpose_config = content.purposes.find(p => p.value === enquiry.purpose);

  return (
    <div className={styles.modal_overlay} onClick={on_close}>
      <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <h2 className={styles.modal_title}>
            <Eye className="w-5 h-5 inline mr-2" />
            {content.modal_content.view.title}
          </h2>
          <button onClick={on_close} className={styles.modal_close_button}>
            <X className={styles.modal_close_icon} />
          </button>
        </div>
        <div className={styles.modal_body}>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Customer Info */}
            <div className="lg:col-span-1 space-y-4">
              <div className={styles.info_card}>
                <h3 className={styles.info_card_title}>
                  <User className="w-4 h-4" />
                  Customer Information
                </h3>
                <div className={styles.info_card_content}>
                  <div className={styles.info_card_field}>
                    <p className={styles.info_card_label}>
                      {content.customer_info_labels.name}
                    </p>
                    <p className={styles.info_card_value}>{enquiry.name}</p>
                  </div>
                  <div className={styles.info_card_field}>
                    <p className={styles.info_card_label}>
                      {content.customer_info_labels.email}
                    </p>
                    <p className={styles.info_card_value}>{enquiry.email}</p>
                  </div>
                  <div className={styles.info_card_field}>
                    <p className={styles.info_card_label}>
                      {content.customer_info_labels.enquiry_id}
                    </p>
                    <p className={styles.info_card_value}>{enquiry.id}</p>
                  </div>
                </div>
              </div>

              <div className={styles.info_card}>
                <h3 className={styles.info_card_title}>
                  <Tag className="w-4 h-4" />
                  Metadata
                </h3>
                <div className={styles.info_card_content}>
                  <div className="space-y-3">
                    <div>
                      <p className={styles.form_label}>
                        {content.metadata_labels.status}
                      </p>
                      <select
                        value={enquiry.status}
                        onChange={(e) => on_status_change(enquiry.id, { status: e.target.value })}
                        className={styles.form_select}
                        disabled={enquiry.status === 'Closed'}
                      >
                        {content.statuses.map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <p className={styles.form_label}>
                        {content.metadata_labels.priority}
                      </p>
                      <select
                        value={enquiry.priority}
                        onChange={(e) => on_priority_change(enquiry.id, { priority: e.target.value })}
                        className={styles.form_select}
                      >
                        {content.priorities.map(p => (
                          <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.info_card_field}>
                      <p className={styles.info_card_label}>
                        {content.customer_info_labels.purpose}
                      </p>
                      <p className={styles.info_card_value}>
                        {purpose_config?.emoji} {purpose_config?.label}
                      </p>
                    </div>
                    <div className={styles.info_card_field}>
                      <p className={styles.info_card_label}>
                        {content.customer_info_labels.created}
                      </p>
                      <p className="text-sm text-gray-700">
                        {new Date(enquiry.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className={styles.info_card_field}>
                      <p className={styles.info_card_label}>
                        {content.customer_info_labels.last_updated}
                      </p>
                      <p className="text-sm text-gray-700">
                        {new Date(enquiry.updated_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Subject</h3>
                <p className="text-base font-medium text-gray-900">{enquiry.subject}</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Original Message</h3>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {enquiry.message}
                </p>
              </div>

              {enquiry.replies.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Admin Replies ({enquiry.replies.length})
                  </h3>
                  <div className="space-y-4">
                    {enquiry.replies.map((reply, idx) => (
                      <div key={idx} className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-green-700">
                            {reply.replied_by}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(reply.replied_at).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{reply.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewModal